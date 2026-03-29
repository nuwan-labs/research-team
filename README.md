# Multi-Agent Scientific Research Orchestrator

A React/TypeScript web application where you lead a panel of AI agents with distinct scientific expertises to collaboratively design and evaluate research projects. Built on the Gemini API with live web search and code execution.

## Overview

The Orchestrator simulates a multidisciplinary research team. You direct the conversation; agents respond from within their domain, delegate tasks to each other, and collectively track progress through structured research phases — from Brainstorm through to Conclusion.

A **Project Manager** agent coordinates the panel, emits structured signals to update a live project dashboard (phases, objectives, alerts), and logs decisions as the session evolves.

## Agents

| Agent | Role |
|---|---|
| Project Manager | Coordination, milestones, decision logging |
| Market Analyst | Market sizing, competition, customer cohorts |
| Statistician | Power analysis, R/Python stats, rigor |
| Comp. Biologist | Bioinformatics pipelines, genomics, sequence analysis |
| Molecular Biologist | Wet-lab protocols, reagents, experimental design |
| Programmer | Software engineering, cloud infrastructure |
| Lit. Specialist | Academic search, citation analysis, literature reviews |
| Biz Strategist | Patents, funding, IP strategy |
| Regulatory Expert | FDA/EMA pathways and compliance |
| Clinician | Clinical trials, disease mechanisms |
| Ethics Expert | IRB, bioethics, safety |
| Summarizer | Synthesizes discussion into structured records |

Custom agents can also be created at runtime via the sidebar modal.

## Research Phases

`Brainstorm` → `Hypothesis Generation` → `Experimental Design` → `Evaluation` → `Conclusion`

The Project Manager transitions phases automatically by emitting `[PHASE: ...]` signals parsed from its responses.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (dev server on port 3000)
- **Gemini API** via `@google/genai` — Gemini 2.5 Pro for complex roles, Flash for lighter roles
- Google Search grounding enabled for all agents except Summarizer
- Code execution enabled for Statistician, Comp. Biologist, and Programmer

## Getting Started

**Prerequisites:** Node.js

```bash
npm install
```

Set your Gemini API key in `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure

```
├── App.tsx                        # Root component, state management, agent dispatch
├── constants.ts                   # Agent definitions and initial project state
├── types.ts                       # TypeScript types (Agent, ProjectState, etc.)
├── index.tsx / index.html         # Entry point
├── components/
│   ├── AgentSidebar.tsx           # Agent toggles + custom agent creation
│   ├── MessageBubble.tsx          # Chat messages with grounding source links
│   └── ProjectTrackingPanel.tsx   # Phase stepper, objectives, delegated tasks
├── services/
│   └── geminiService.ts           # Gemini API calls, signal parsing, tool config
├── Antigravity/                   # Companion project: consumer-facing app concept
└── codex/                         # Companion project: Next.js research workspace
```

## Signal Protocol

The Project Manager (and other agents) emit structured tags that drive the live dashboard:

| Tag | Effect |
|---|---|
| `[PHASE: Phase Name]` | Transitions the research phase |
| `[COMPLETED: text]` | Marks a matching objective complete |
| `[NEW_OBJECTIVE: text]` | Adds a new objective to the tracker |
| `[ALERT: message]` | Creates a warning alert |

Delegation pattern `* **Agent Name:** task` creates pending action items that auto-complete when that agent responds.
