# Universal AI Architect

A flexible, general-purpose AI agent generator and assistant interface built with Next.js and TypeScript. This project is designed to architect, orchestrate, and manage intelligent agents tailored for any topic, scenario, or custom workflow that arises.

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Linting/Formatting:** ESLint

## Architecture & Documentation

The root directory contains strategic documentation files to align development and agent behaviors:
* `app/`: Core application logic, interface components, and API route handlers (including OpenAI integration).
* `AGENTS.md`: Defines the core architecture, behavioral guidelines, and custom capabilities for the generated general-purpose agents.
* `CLAUDE.md`: System prompts and specialized operational context tailored for LLM collaboration and development constraints.

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18.x or higher) and npm installed on your environment.

### Installation

1. **Clone the repository:**
```bash
   git clone [https://github.com/S1ddh4rth4/ask-the-ai.git](https://github.com/S1ddh4rth4/ask-the-ai.git)
   cd ask-the-ai
Install dependencies:

Bash
   npm install
Environment Variables Setup:
Create a .env.local file in the root directory to store your sensitive credentials safely:

Bash
   # OpenAI API Configuration
   OPENAI_API_KEY=your_api_key_here
(Note: The .env.local file is automatically ignored by Git to secure your development keys).

Run the development server:

Bash
   npm run dev
Open http://localhost:3000 in your browser to interact with the local instance.

🔒 License
This project is maintained locally for private development and AI agent orchestration prototyping.
