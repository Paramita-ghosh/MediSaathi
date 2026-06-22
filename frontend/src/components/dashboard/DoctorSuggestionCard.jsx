import React from 'react';
import { AlertCircle, ExternalLink, MapPin, Star, Stethoscope } from 'lucide-react';

const DoctorSuggestionCard = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <div className="bg-[#182b2f]/90 border border-cyan-400/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(82,211,216,0.18)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-lg bg-cyan-400/15 p-2 text-cyan-200">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Specialty Starting Point</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{suggestion.specialty}</h3>
          <p className="mt-1 text-sm text-gray-300">{suggestion.reason}</p>
        </div>
      </div>

      {suggestion.doctors?.length > 0 ? (
        <div className="mt-4 space-y-3">
          {suggestion.doctors.map((doctor) => (
            <a
              key={`${doctor.name}-${doctor.address}`}
              href={doctor.mapsUrl || suggestion.mapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/10 bg-black/20 p-3 transition-colors hover:border-cyan-300/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{doctor.name}</p>
                  <p className="mt-1 flex items-start gap-2 text-sm text-gray-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                    <span>{doctor.address || 'Address available on map'}</span>
                  </p>
                  {doctor.rating && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-amber-200">
                      <Star className="h-4 w-4 fill-current" />
                      {doctor.rating} ({doctor.userRatingsTotal || 0})
                    </p>
                  )}
                  {typeof doctor.distanceMeters === 'number' && (
                    <p className="mt-2 text-sm text-cyan-200">
                      {(doctor.distanceMeters / 1000).toFixed(1)} km away
                    </p>
                  )}
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-cyan-200" />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="flex items-start gap-2 text-sm text-gray-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
            Nearby doctor list needs location access. You can still search the map directly.
          </p>
        </div>
      )}

      <a
        href={suggestion.mapsSearchUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
      >
        Open in Map
        <ExternalLink className="h-4 w-4" />
      </a>

      <p className="mt-3 text-xs text-gray-400">{suggestion.disclaimer}</p>
    </div>
  );
};

export default DoctorSuggestionCard;
