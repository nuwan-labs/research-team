# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-Agent Scientific Research Orchestrator - A React/TypeScript web application where users lead panels of AI agents with distinct scientific expertises. Agents use the Gemini API with web search and code execution capabilities.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` (exposed as `process.env.API_KEY` via Vite).

## Architecture

### Data Flow
1. User sends message or triggers agent via "Direct Ask" buttons
2. `App.tsx` determines target agent (defaults to Project Manager if active)
3. `geminiService.ts` constructs system prompt with orchestration context and calls Gemini API
4. Response is parsed for signal tags (`[PHASE:]`, `[COMPLETED:]`, `[NEW_OBJECTIVE:]`, `[ALERT:]`) and delegation patterns (`* **Agent Name:** task`)
5. `ProjectState` is updated based on parsed signals

### Agent System (`constants.ts`, `types.ts`)
- 12 predefined agents with distinct roles, system prompts, and tool access
- `AgentRole` enum determines model selection and available tools in `geminiService.ts`
- Complex roles (Statistician, Comp. Biologist, Programmer, Clinician, Regulatory Expert, Lit. Specialist) use `gemini-3-pro-preview`; others use `gemini-3-flash-preview`
- Code execution tool enabled only for: `STATISTICS_EXPERT`, `COMPUTATIONAL_BIOLOGIST`, `PROGRAMMER`
- Google Search enabled for all agents except `SUMMARIZER`
- Custom agents can be created via modal; they get `AgentRole.CUSTOM` and basic web search

### State Management
- `SimulationState`: messages, processing state, project state
- `ProjectState`: current phase, objectives, action items, alerts
- Research phases: Brainstorm -> Hypothesis Generation -> Experimental Design -> Evaluation -> Conclusion

### Signal Protocol
Agents (especially Project Manager) emit special tags that are parsed in `parseAgentSignals()`:
- `[PHASE: Phase Name]` - transitions research phase
- `[COMPLETED: objective text]` - marks matching objective complete
- `[NEW_OBJECTIVE: text]` - adds new objective
- `[ALERT: message]` - creates warning alert

Delegation pattern `* **Agent Name:** task description` creates pending action items that auto-complete when that agent responds.

### Components
- `AgentSidebar.tsx` - Agent activation toggles + custom agent creation modal
- `MessageBubble.tsx` - Chat messages with grounding source links
- `ProjectTrackingPanel.tsx` - Phase stepper, objectives checklist, delegated tasks, health metrics

### Path Aliases
`@/*` maps to project root (configured in `tsconfig.json` and `vite.config.ts`).
