import { GoogleGenAI } from "@google/genai";
import { ArtStyle, AspectRatio } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize client
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates an image using Gemini Flash Image model
 */
export const generateImage = async (
  prompt: string,
  style: ArtStyle,
  aspectRatio: AspectRatio
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Refine prompt with style
  const fullPrompt = `Generate a high-quality image with the style "${style}". 
  Subject: ${prompt}. 
  Ensure high detail, artistic composition, and good lighting.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // count: 1 // Default is 1
        }
      },
    });

    // Extract image from response
    // The response structure for images in flash-image usually puts the image in the parts
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated.");
    }

    // Iterate to find the image part
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};
