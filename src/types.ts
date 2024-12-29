export interface Config {
  openaiApiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  openaiBaseUrl?: string;
} 