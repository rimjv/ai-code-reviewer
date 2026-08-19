# AI Code Reviewer

An Angular application that sends pasted source code to a Firebase HTTPS Cloud Function. The function submits the code to OpenAI and returns a review covering bugs, security, performance, code quality, and improvements.

## Prerequisites

- Node.js 24 or later
- npm
- Firebase CLI: `npm install -g firebase-tools`
- An OpenAI API key

## Install dependencies

Install the Angular dependencies from the project root:

```bash
npm install
```

Install the Firebase Functions dependencies:

```bash
cd functions
npm install
cd ..
```

## Start the Firebase server locally

The Angular app expects the `reviewCode` function at the Firebase Functions emulator URL. Set the OpenAI key in the same terminal that starts the Functions emulator.

PowerShell:

```powershell
$env:OPENAI_API_KEY = "your-openai-api-key"
cd functions
npm run serve
```

`npm run serve` first compiles `functions/src/index.ts` into `functions/lib/`, then starts the Functions emulator on port `5001`.

Keep that terminal running. In a second terminal, from the project root, start Angular:

```bash
npm start
```

Open `http://localhost:4200/`. The local review endpoint is:

```text
http://127.0.0.1:5001/ai-code-reviewer-ce18e/us-central1/reviewCode
```

The Firebase Emulator UI is available at `http://127.0.0.1:4000/` when the emulator is running.

## Backend commands

Run these from the `functions/` directory:

```bash
npm run build    # Compile TypeScript
npm run serve    # Build and start the Functions emulator
npm run shell    # Build and start the Firebase Functions shell
npm run lint     # Run ESLint
npm run deploy   # Deploy the Functions to Firebase
npm run logs     # View deployed Function logs
```

## Frontend commands

Run these from the project root:

```bash
npm start        # Start Angular development server
npm run build    # Create a production build in dist/
npm test         # Run unit tests
```

## Project structure

```text
src/                   Angular frontend
src/app/app.ts         Main component and API request
src/app/app.html       Code input and review output
functions/src/         Firebase Functions source
functions/src/index.ts reviewCode HTTPS function
functions/lib/         Compiled Functions output
firebase.json          Firebase emulator and deployment configuration
```

## Production deployment

Build and deploy the backend from `functions/`:

```bash
npm run deploy
```

Before deploying, configure `OPENAI_API_KEY` using Firebase's supported secrets or environment configuration. Do not commit API keys or local `.env` files.
