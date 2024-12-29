# Clean Text

A TypeScript-based command-line tool that helps batch process text files using OpenAI API to remove or keep content according to user-provided examples.

## Features

* Written in TypeScript for type safety and better development experience
* Supports batch processing of multiple text files
* Flexible content transformation based on user examples
* Configurable OpenAI model settings
* Command-line interface for easy usage

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

4. Build the project:
```bash
yarn build
```


## Usage

Basic usage:
```bash
yarn start -- -i <input-path> -o <output-path> -e <example-file>
```

Options:
- `-i, --input <path>`: Input directory or file (required)
- `-o, --output <path>`: Output directory (required)
- `-e, --example <path>`: Example file for processing instructions
- `-c, --config <path>`: Custom configuration file path

Example:

```bash
yarn start -- -i ./input-files -o ./output -e ./example.txt
```

This command will process all text files in the `input-files` directory and save the cleaned content to the `output` directory. The `example.txt` file contains the processing instructions for the tool.


## Configuration

You can customize the behavior by creating a config file (JSON):

```json
{
"model": "gpt-4-turbo-preview",
"maxTokens": 2000,
"temperature": 0.3
}
```

This config file will override the default settings in the `loadConfig` function.


## Development

- Run in development mode:

```bash
yarn dev
```

- Run tests:

```bash
yarn test
```

- Lint code:

```bash
npm run lint
```

## Project Structure

clean-text/
├── src/
│ ├── index.ts # Entry point
│ ├── processor.ts # Text processing logic
│ ├── config.ts # Configuration management
│ └── types.ts # TypeScript interfaces
├── dist/ # Compiled JavaScript
├── .env # Environment variables
└── package.json


## Requirements

- Node.js 16 or higher
- OpenAI API key
- TypeScript 5.x

## License

MIT