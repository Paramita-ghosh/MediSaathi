// controllers/chatController.js
import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant"; // ✅ Default Groq model

// @desc    Handle AI chat
// @route   POST /api/chat
// @access  Private
const generateChatResponse = async (req, res) => {
  const { prompt } = req.body;

  // --- Validation ---
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  if (!GROQ_API_KEY) {
    return res
      .status(500)
      .json({ message: "GROQ_API_KEY not configured on server" });
  }

  try {
    // --- Groq expects a messages array like OpenAI ---
    const messages = [
      {
        role: "system",
        content:
          "You are a friendly and helpful wellness assistant for an app called MediSaathi. Answer questions about medication schedules and wellness clearly and politely.",
      },
      { role: "user", content: prompt },
    ];

    const payload = {
      model: GROQ_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 500,
    };

    const { data } = await axios.post(GROQ_URL, payload, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 60000, // 60 seconds
    });

    // --- Extract AI message safely ---
    const aiText = data?.choices?.[0]?.message?.content?.trim();

    if (!aiText) {
      console.error("Unexpected Groq response:", JSON.stringify(data, null, 2));
      return res
        .status(500)
        .json({ message: "Invalid response structure from Groq", raw: data });
    }

    return res.json({ response: aiText });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);

    const errMsg =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message;

    // Handle model waking up or timeout
    if (errMsg?.toLowerCase()?.includes("loading")) {
      return res.status(503).json({
        message: "The Groq model is waking up, please try again in a few seconds.",
      });
    }

    return res.status(500).json({
      message: "Failed to get response from AI",
      error: errMsg,
    });
  }
};

export { generateChatResponse };
