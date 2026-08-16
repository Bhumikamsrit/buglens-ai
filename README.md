# BugLens — AI Root-Cause Investigator

BugLens is an interview-ready production incident investigation demo. It turns raw logs into a ranked diagnosis, evidence, alternative causes, investigation steps and a remediation recommendation.

## Live demo architecture

Logs → signal extraction → incident retrieval → structured diagnosis → evidence → fix

The current public demo is local-first: five realistic incident scenarios are embedded in the app, so the UI works without an API key. This makes it reliable for interviews and avoids sending pasted logs to a third party.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Interview demo

1. Select **Expired authentication token**.
2. Click **Investigate incident**.
3. Show the root cause and confidence.
4. Open **Evidence** and explain why the diagnosis is grounded.
5. Open **Evaluation** to show the known-scenario benchmark.

## Why this is more than a chatbot

The project separates retrieval/evidence from diagnosis and uses structured incident patterns. In a production version, the matcher can be replaced with embeddings/vector search and the diagnosis layer can call an LLM with JSON schema validation and guardrails.
