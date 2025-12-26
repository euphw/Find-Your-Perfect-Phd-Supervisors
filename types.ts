export interface Supervisor {
  name: string;
  title?: string;               // New: e.g. "Associate Professor", "Chair"
  university: string;
  department: string;
  country?: string;
  researchKeywords: string[];
  matchReason: string;
  website?: string;
  
  universityRank?: string;      
  fundingEstimate?: string;
  scholarshipAvailable?: boolean; // New: Is scholarship explicitly mentioned?

  hookPaperTitle?: string;
  hookPaperUrl?: string;
  
  hiringStatus?: string;
  intakeTerm?: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  supervisors: Supervisor[];
  groundingChunks: GroundingChunk[];
}

export interface SearchCriteria {
  topic: string;
  countries: string;           // Replaced region with countries input
  maxRank: string;             // e.g. "10", "50", "100", "Any"
  requireScholarship: boolean; // New filter
  background: string;
}