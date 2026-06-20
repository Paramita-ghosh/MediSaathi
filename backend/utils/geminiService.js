import { GoogleGenerativeAI } from "@google/generative-ai";

let geminiModel = null;
let activeModelName = null;

const getGeminiModel = () => {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) return null;

  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (geminiModel && activeModelName === modelName) return geminiModel;

  const client = new GoogleGenerativeAI(apiKey);
  geminiModel = client.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
  activeModelName = modelName;

  return geminiModel;
};

const createFallbackSummary = (text) => {
  const cleaned = text.replace(/\s+/g, " ").trim();

  if (cleaned.length <= 150) {
    return cleaned;
  }

  return cleaned.slice(0, 150) + "...";
};

export const summarizePostContent = async (content) => {
  try {
    const model = getGeminiModel();

    if (!model) {
      console.warn("Gemini API key not configured");
      return {
        summary: createFallbackSummary(content),
        sentiment: "neutral",
      };
    }

    const prompt = `
Analyze the following community health post.

Return ONLY valid JSON in this format:

{
  "summary": "short summary in 1-2 sentences",
  "sentiment": "positive"
}

Sentiment rules:
- positive = author had a good experience or recommends the treatment
- negative = author had a bad experience or advises against it
- neutral = neither positive nor negative

Post:
${content}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    const jsonText =
      jsonStart >= 0 && jsonEnd >= jsonStart
        ? cleaned.slice(jsonStart, jsonEnd + 1)
        : cleaned;
    const parsed = JSON.parse(jsonText);

    return {
      summary: parsed.summary?.trim() || createFallbackSummary(content),
      sentiment:
        parsed.sentiment === "positive" ||
        parsed.sentiment === "negative" ||
        parsed.sentiment === "neutral"
          ? parsed.sentiment
          : "neutral",
    };
  } catch (error) {
    console.error("Gemini summarization failed:", error);

    return {
      summary: createFallbackSummary(content),
      sentiment: "neutral",
    };
  }
};
