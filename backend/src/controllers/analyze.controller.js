import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an AI vision auditor.

1. Describe what you see in the image.
2. Decide if the scene looks normal or suspicious.
3. Give a confidence score from 0 to 100.

Respond ONLY in valid JSON:
{
  "message": "text",
  "confidence": number
}
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
      prompt,
    ]);

    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid Gemini response");

    const parsed = JSON.parse(jsonMatch[0]);

    res.json({
      message: parsed.message,
      confidence: parsed.confidence,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({
      message: "Gemini analysis failed",
      confidence: null,
    });
  }
};
