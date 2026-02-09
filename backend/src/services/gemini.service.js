import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeImage(base64Image) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // fast + vision
  });

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: "image/jpeg",
    },
  };

  const prompt = `
You are an AI vision system.
Analyze the image and respond STRICTLY in JSON.

Return:
{
  "summary": string,
  "anomaly": boolean,
  "certainty": number (0-100)
}

Be conservative with certainty.
`;

  const result = await model.generateContent([
    prompt,
    imagePart,
  ]);

  const text = result.response.text();

  // Safe JSON extraction
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid Gemini response");
  }

  return JSON.parse(jsonMatch[0]);
}
