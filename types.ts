export interface Voice {
  Gender: string;
  Language: string;
  Name: string;
  ReadableName: string;
}

export interface GenerationSettings {
  voice: Voice | null;
  rate: number;
  pitch: number;
  text: string;
}

export interface AudioHistoryItem {
  id: string;
  text: string;
  voiceName: string;
  timestamp: number;
  url: string;
  duration?: number;
}

export enum ViewMode {
  EDITOR = 'EDITOR',
  HISTORY = 'HISTORY'
}