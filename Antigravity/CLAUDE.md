# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-Agent Scientific Research Orchestrator - A React/TypeScript web application where users lead panels of AI agents with distinct scientific expertises. Agents use the Gemini API with web search and code execution capabilities.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Setup

Create `.env.local` with `GEMINI_API_KEY` for the Gemini API.

## Architecture

### Three-Panel Layout
- **Left**: Agent sidebar with activation toggles and custom agent creation
- **Center**: Chat area with Direct Ask buttons and message input
- **Right**: Project tracking panel (phase stepper, objectives, delegated tasks, health metrics)

### Agent System
- 12 predefined agents with distinct roles, system prompts, and tool access
- Complex roles (Statistician, Comp. Biologist, Programmer, Clinician, Regulatory Expert, Lit. Specialist) should use advanced model tier
- Code execution enabled only for: Statistician, Computational Biologist, Programmer
- Web search enabled for all agents except Summarizer
- Custom agents get basic web search only

### Response Selection Logic
1. If agent directly asked via "Direct Ask" button, that agent responds
2. Otherwise if Project Manager is active, they respond
3. Otherwise first active agent responds

### Signal Protocol
Agents (especially Project Manager) emit special tags that must be parsed:
- `[PHASE: Phase Name]` - transitions research phase
- `[COMPLETED: objective text]` - marks matching objective complete
- `[NEW_OBJECTIVE: text]` - adds new objective
- `[ALERT: message]` - creates warning alert

Delegation pattern `* **Agent Name:** task description` creates pending action items that auto-complete when that agent responds.

### Research Phases
Sequential progression: Brainstorm -> Hypothesis Generation -> Experimental Design -> Evaluation -> Conclusion

### Context Management
- Only send last 15 messages for context
- Include system instruction with agent identity and active panel members
