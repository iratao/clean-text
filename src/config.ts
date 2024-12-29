import { config as dotenvConfig } from 'dotenv';
import { readFile } from 'fs/promises';
import { Config } from './types';

export async function loadConfig(configPath?: string): Promise<Config> {
  // Load .env file
  dotenvConfig();

  // Default configuration
  const defaultConfig: Config = {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    openaiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3')
  };

  if (!configPath) {
    return defaultConfig;
  }

  try {
    const configFile = await readFile(configPath, 'utf-8');
    const userConfig = JSON.parse(configFile);
    return { ...defaultConfig, ...userConfig };
  } catch (error) {
    console.warn(`Warning: Could not load config file: ${error}`);
    return defaultConfig;
  }
} 