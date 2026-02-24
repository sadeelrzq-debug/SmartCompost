export type WasteType = 'vegetables' | 'fruits' | 'cooked' | 'leaves' | 'coffee' | 'other';
export type WasteColor = 'green' | 'brown' | 'yellow' | 'black' | 'white' | 'other';
export type WasteSmell = 'natural' | 'sour' | 'bad';
export type AnalysisStatus = 'compostable' | 'needs_improvement' | 'not_compostable';

export interface WasteAnalysisInput {
  type: WasteType;
  color: WasteColor;
  smell: WasteSmell;
  days: number;
  image?: string; // base64
  voiceDescription?: string;
}

export interface AnalysisResult {
  status: AnalysisStatus;
  score: number;
  explanation: string;
  instructions: string[];
  scientificReasoning: string;
}

export interface UserStats {
  points: number;
  totalAnalyses: number;
  compostableCount: number;
  needsImprovementCount: number;
  notCompostableCount: number;
}
