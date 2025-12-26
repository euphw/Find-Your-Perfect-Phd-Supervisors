import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SearchResult, Supervisor } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findSupervisors = async (
  topic: string,
  region: string,
  background: string
): Promise<SearchResult> => {
  const modelId = "gemini-3-flash-preview"; 

  const prompt = `
    Act as an expert academic consultant for PhD applicants.
    Task: Find roughly 20 currently active PhD supervisors/professors who are a great match for the following student profile:
    - Research Interest: "${topic}"
    - Target Region: "${region}"
    - Student Background: "${background}"

    Instructions:
    1. Use Google Search to find REAL, currently active professors. Aim for a comprehensive list of 20 candidates.
    2. Verify they are still at the listed university.
    3. Look for recent publications (last 3 years) relevant to the topic.
    4. Provide the output strictly as a JSON array of objects inside a markdown code block (\`\`\`json ... \`\`\`).
    
    The JSON object for each supervisor must have these fields:
    - name: Full name of the professor.
    - university: Name of the university.
    - department: Specific department or lab.
    - researchKeywords: An array of 3-4 specific research keywords.
    - matchReason: A brief 1-sentence explanation of why they are a good match based on the topic.
    - website: (Optional) Link to their lab or profile page if found.

    Do not include any text outside the JSON block.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // We don't use responseMimeType: 'application/json' here because we want the model to Use the Search Tool effectively
        // often strict JSON mode disables tools in some preview versions or makes them less effective. 
        // We will parse the markdown json.
      },
    });

    const text = response.text || "";
    
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    let supervisors: Supervisor[] = [];
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        supervisors = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini response", e);
        // Fallback: empty list or handle partial text
      }
    } else {
      // Attempt to parse raw text if no code blocks
      try {
        supervisors = JSON.parse(text);
      } catch (e) {
        console.warn("Could not parse direct JSON", e);
      }
    }

    // Extract grounding chunks (citations)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      supervisors,
      groundingChunks,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};