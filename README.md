# SpecSense — AI Requirement Clarity Checker

SpecSense is a lightweight, interview-ready product engineering tool that turns vague feature requests into clearer, more buildable requirements.

## What it does

Paste a requirement and SpecSense:

- Scores its clarity from 0–100
- Detects useful signals such as UI changes and business workflows
- Identifies missing details
- Generates questions an engineer should ask before implementation
- Produces a scenario-specific clearer starting specification

## Example

Input:

> Let customers cancel an order and get a refund.

SpecSense can surface questions about cancellation windows, partial vs. full refunds, payment failures, order states and refund completion time.

## Demo flow

**Requirement → Clarity Score → Missing Details → Questions → Rewrite**

The app includes three ready-made scenarios so it can be demonstrated in about 60 seconds during an interview.

## Tech stack

- Next.js
- React
- TypeScript
- CSS
- Client-side requirement analysis

The current MVP intentionally runs without an API key, making it reliable and privacy-friendly for a live interview demo. The analysis layer can later be replaced or augmented with an LLM using structured JSON output and an evaluation dataset of real engineering tickets.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Interview pitch

> **SpecSense is an AI-assisted requirement clarification copilot. Before developers start coding, it identifies ambiguity, asks the questions that matter, and converts a vague product idea into a clearer starting specification.**
