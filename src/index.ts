import { Command } from 'commander';
import { processFiles } from './processor';
import { loadConfig } from './config';

const program = new Command();

program
  .name('clean-text')
  .description('Batch process text files using OpenAI API')
  .version('1.0.0')
  .requiredOption('-i, --input <path>', 'Input directory or file')
  .requiredOption('-o, --output <path>', 'Output directory')
  .option('-e, --example <path>', 'Example file for processing instructions')
  .option('-c, --config <path>', 'Configuration file path')
  .parse(process.argv);

async function main() {
  const options = program.opts();
  const config = await loadConfig(options.config);
  
  try {
    await processFiles({
      inputPath: options.input,
      outputPath: options.output,
      examplePath: options.example,
      config
    });
  } catch (error) {
    console.error('Error processing files:', error);
    process.exit(1);
  }
}

main(); 