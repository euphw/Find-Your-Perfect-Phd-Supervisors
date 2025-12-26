import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SearchResult, Supervisor, SearchCriteria } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseResponse = (text: string): Supervisor[] => {
    // Extract JSON from markdown code block
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    let supervisors: Supervisor[] = [];
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        supervisors = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from Gemini response", e);
      }
    } else {
      try {
        supervisors = JSON.parse(text);
      } catch (e) {
        console.warn("Could not parse direct JSON", e);
      }
    }
    return supervisors;
};

export const findSupervisors = async (
  criteria: SearchCriteria
): Promise<SearchResult> => {
  const modelId = "gemini-3-flash-preview"; 

  const rankInstruction = criteria.maxRank !== "Any" 
    ? `Limit results to universities roughly within the Global Top ${criteria.maxRank} (QS/THE rankings).`
    : "";

  const scholarshipInstruction = criteria.requireScholarship
    ? "PRIORITIZE professors/labs that explicitly state they have funding, scholarships, or RA/TA positions available."
    : "";

  const prompt = `
    Act as an expert academic consultant for PhD applicants.
    Task: Find a comprehensive list of **50** currently active PhD supervisors/professors who are a great match for the following student profile:
    - Research Interest: "${criteria.topic}"
    - Target Countries: "${criteria.countries}" (Focus strictly on these locations)
    - Student Background: "${criteria.background}"
    
    Constraints:
    1. ${rankInstruction}
    2. ${scholarshipInstruction}
    3. Use Google Search to find REAL, currently active professors.
    4. **Crucial:** Find a specific "Hook Paper" published in **2024 or 2025** (include short title + URL).
    5. **Hiring Status:** Check their personal website for "Join Us" / "Openings".
    
    Output Format:
    Provide the output strictly as a JSON array of objects inside a markdown code block (\`\`\`json ... \`\`\`).
    
    The JSON object for each supervisor must have these fields:
    - name: Full name.
    - title: Academic Title (e.g., "Associate Professor", "Lecturer", "Chair").
    - university: Name of the university.
    - country: The country (e.g., "USA", "UK").
    - department: Specific department.
    - researchKeywords: Array of 3-4 keywords.
    - matchReason: Brief 1-sentence fit explanation.
    - website: Link to profile/lab.
    - universityRank: Global Ranking (e.g., "QS #45").
    - fundingEstimate: Estimate of lab resources (e.g., "High", "Active").
    - scholarshipAvailable: boolean (true if they often fund students or have open calls).
    - hookPaperTitle: Shortened title of 2024-25 paper.
    - hookPaperUrl: URL to the paper.
    - hiringStatus: "Hiring", "Likely Hiring", "Not Hiring", or "Unknown".
    - intakeTerm: e.g., "Fall 2025" or empty.

    Do not include any text outside the JSON block.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      supervisors: parseResponse(response.text || ""),
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const findCoAuthors = async (
  sourceName: string,
  sourceUni: string,
  topic: string
): Promise<SearchResult> => {
  const modelId = "gemini-3-flash-preview";

  const prompt = `
    Act as an academic researcher performing a "snowball" search for a literature review and PhD networking.
    
    CONTEXT: The user likes the work of Professor "${sourceName}" at "${sourceUni}" regarding "${topic}".
    
    TASK: Find 6-8 OTHER professors who frequently co-author papers with "${sourceName}" OR are in the same specific tight-knit research network/lab circle.
    
    CRITICAL FILTERS:
    1. The results MUST be Faculty/Professors.
    2. They must be currently active in research related to: "${topic}".
    3. Look for a recent "Hook Paper" (2024-2025) with a link.
    4. Check if they are hiring PhDs.

    OUTPUT FORMAT:
    Provide the output strictly as a JSON array of objects inside a markdown code block (\`\`\`json ... \`\`\`).
    
    The JSON object for each supervisor must have:
    - name: Full name.
    - title: Academic Title.
    - university: Current university.
    - country: Country.
    - department: Department.
    - researchKeywords: 3-4 keywords.
    - matchReason: Explain connection.
    - website: Link.
    - universityRank: Global ranking.
    - fundingEstimate: Lab resources.
    - scholarshipAvailable: boolean.
    - hookPaperTitle: Short 2024-25 paper title.
    - hookPaperUrl: URL.
    - hiringStatus: "Hiring" etc.
    - intakeTerm: e.g. "Fall 2025".

    Do not include text outside the JSON block.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      supervisors: parseResponse(response.text || ""),
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
    };
  } catch (error) {
    console.error("Gemini Co-author Search Error:", error);
    throw error;
  }
};