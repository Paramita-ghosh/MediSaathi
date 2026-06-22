import axios from "axios";
import { getDoctorSpecialtyForMedication } from "./geminiService.js";

const DEFAULT_RADIUS_METERS = 5000;
const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

const buildMapSearchUrl = ({ specialty, latitude, longitude }) => {
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;
  }

  const query = encodeURIComponent(specialty);
  return `https://www.openstreetmap.org/search?query=${query}`;
};

const buildOsmPlaceUrl = ({ latitude, longitude }) => {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`;
};

const normalizeAddress = (tags = {}) =>
  [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:city"],
    tags["addr:postcode"],
  ]
    .filter(Boolean)
    .join(", ");

const calculateDistanceMeters = ({ fromLat, fromLng, toLat, toLng }) => {
  const earthRadiusMeters = 6371000;
  const toRadians = (value) => (value * Math.PI) / 180;
  const deltaLat = toRadians(toLat - fromLat);
  const deltaLng = toRadians(toLng - fromLng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const normalizePlace = (place, origin) => {
  const latitude = place.lat ?? place.center?.lat;
  const longitude = place.lon ?? place.center?.lon;
  const distanceMeters = calculateDistanceMeters({
    fromLat: origin.latitude,
    fromLng: origin.longitude,
    toLat: latitude,
    toLng: longitude,
  });

  return {
    name: place.tags?.name || place.tags?.operator || "Nearby doctor or clinic",
    address: normalizeAddress(place.tags) || place.tags?.["addr:full"] || "",
    distanceMeters: Math.round(distanceMeters),
    rating: null,
    userRatingsTotal: 0,
    openNow: null,
    mapsUrl: buildOsmPlaceUrl({ latitude, longitude }),
  };
};

const escapeOverpassRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findNearbyDoctors = async ({ specialty, latitude, longitude }) => {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return [];
  }

  const specialtyRegex = escapeOverpassRegex(specialty);
  const query = `
    [out:json][timeout:25];
    (
      node(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["amenity"~"^(doctors|clinic|hospital)$"];
      way(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["amenity"~"^(doctors|clinic|hospital)$"];
      relation(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["amenity"~"^(doctors|clinic|hospital)$"];
      node(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["healthcare"~"^(doctor|clinic|hospital|specialist)$"];
      way(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["healthcare"~"^(doctor|clinic|hospital|specialist)$"];
      relation(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["healthcare"~"^(doctor|clinic|hospital|specialist)$"];
      node(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["name"~"${specialtyRegex}",i];
      way(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["name"~"${specialtyRegex}",i];
      relation(around:${DEFAULT_RADIUS_METERS},${lat},${lng})["name"~"${specialtyRegex}",i];
    );
    out center tags 12;
  `;

  const { data } = await axios.post(OVERPASS_API_URL, `data=${encodeURIComponent(query)}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "MediSaathi/1.0 doctor-suggestions",
    },
  });

  return (data.elements || [])
    .filter((place) => Number.isFinite(place.lat ?? place.center?.lat))
    .filter((place) => Number.isFinite(place.lon ?? place.center?.lon))
    .map((place) => normalizePlace(place, { latitude: lat, longitude: lng }))
    .filter((place) => place.distanceMeters <= DEFAULT_RADIUS_METERS)
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, 5)
};

export const getDoctorSuggestionsForMedication = async ({ medicineName, latitude, longitude }) => {
  const specialtyResult = await getDoctorSpecialtyForMedication(medicineName);
  const lat = Number(latitude);
  const lng = Number(longitude);
  let doctors = [];
  let lookupStatus = "location_missing";

  try {
    doctors = await findNearbyDoctors({
      specialty: specialtyResult.specialty,
      latitude: lat,
      longitude: lng,
    });
    lookupStatus = doctors.length > 0 ? "ok" : "no_results";
  } catch (error) {
    console.error("Nearby doctor lookup failed:", error);
    lookupStatus = "lookup_failed";
  }

  return {
    medicineName,
    specialty: specialtyResult.specialty,
    reason: specialtyResult.reason,
    source: specialtyResult.source,
    lookupStatus,
    doctors,
    mapsSearchUrl: buildMapSearchUrl({
      specialty: specialtyResult.specialty,
      latitude: lat,
      longitude: lng,
    }),
    disclaimer:
      "This is a non-diagnostic starting point, not medical advice. Confirm with a qualified doctor. For severe or emergency symptoms, seek urgent medical care.",
  };
};
