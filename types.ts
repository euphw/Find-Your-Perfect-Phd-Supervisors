export interface Supervisor {
  name: string;
  university: string;
  department: string;
  researchKeywords: string[];
  matchReason: string;
  website?: string;
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
  region: string;
  background: string;
}