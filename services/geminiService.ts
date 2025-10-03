
import { GoogleGenAI, Type } from "@google/genai";
import { FormData, Idea } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      ideaTitle: {
        type: Type.STRING,
        description: "A short, catchy title for the post idea.",
      },
      caption: {
        type: Type.STRING,
        description: "The full text content for the social media post. Use emojis where appropriate.",
      },
      hashtags: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "An array of 5 relevant hashtags, each starting with '#'.",
      },
      visualSuggestion: {
        type: Type.STRING,
        description: "A clear and specific suggestion for the visual component of the post (e.g., 'A high-energy, fast-cut video showing the product in action').",
      },
    },
    required: ["ideaTitle", "caption", "hashtags", "visualSuggestion"],
  },
};

const generateImage = async (prompt: string, visualStyle: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A professional, high-quality marketing image for social media in a ${visualStyle} style. ${prompt}`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return ""; // Return empty string if no image is generated
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    return ""; // Return empty string on error to not block other ideas
  }
};

export const generateIdeas = async (formData: FormData): Promise<Idea[]> => {
  const { productName, targetAudience, marketingGoal, platform, tone, visualStyle } = formData;

  const prompt = `
    As an expert social media strategist for the marketing agency STWNY, generate 3 creative and engaging social media post ideas for the ${platform} platform.

    Product/Company: ${productName}
    Target Audience: ${targetAudience}
    Primary Goal: ${marketingGoal}
    Tone of Voice: ${tone}

    For each idea, provide a compelling caption, 5 relevant hashtags, and a specific suggestion for a visual (photo, video, or graphic). Ensure the tone is strictly '${tone}', professional, modern, and aligned with a top-tier marketing agency. Return the response in the structured JSON format as defined by the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const ideas: Idea[] = JSON.parse(jsonText);
    
    // Generate an image for each idea in parallel
    const ideasWithImages = await Promise.all(
        ideas.map(async (idea) => {
            const imageUrl = await generateImage(idea.visualSuggestion, visualStyle);
            return { ...idea, imageUrl };
        })
    );

    return ideasWithImages;

  } catch (error) {
    console.error("Error generating ideas from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate ideas: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating ideas.");
  }
};
