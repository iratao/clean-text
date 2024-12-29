import { OpenAI } from 'openai';
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { Config } from './types';

interface ProcessOptions {
  inputPath: string;
  outputPath: string;
  examplePath?: string;
  config: Config;
}

const DEVELOPER_MESSAGE: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  "role": "system",
  "content": "You are a helpful assistant that can help me clean text files based on given example."
}

const genUserMessage = (textToClean: string, example: string) => {
  return {
    "role": "user",
    "content": `
    Please clean the following text based on the example, and return the cleaned text only:
    ${textToClean}

    Example:
    ${example}
    `
  } as OpenAI.Chat.Completions.ChatCompletionMessageParam
}

export async function processFiles(options: ProcessOptions) {
  const openai = new OpenAI({
    apiKey: options.config.openaiApiKey,
    baseURL: options.config.openaiBaseUrl || 'https://api.openai.com/v1',
  });

  const example = options.examplePath 
    ? await readFile(options.examplePath, 'utf-8')
    : '';

  // for each file in inputPath, call processFile
  const files = await readdir(options.inputPath);
  for (const file of files) {
    await processFile(file, options.inputPath,options.outputPath, openai, example, options.config);
  }
}

async function processFile(
  fileName: string,
  filePath: string,
  outputPath: string,
  openai: OpenAI,
  example: string,
  config: Config
) {
  const content = await readFile(join(filePath, fileName), 'utf-8');
  // TODO: Implement OpenAI processing
  // This is where we'll add the AI processing logic
  console.log(`Processing file ${fileName}...`);


  const result = await openai.chat.completions.create({
    model: config.model,
    messages: [DEVELOPER_MESSAGE, genUserMessage(content, example)],
  });

  await writeFile(join(outputPath, fileName), result.choices[0].message.content ?? '');
  console.log(`✅ Processed file ${filePath} and saved to ${outputPath}`);
} 