# Agent Architecture

## Overview

Each agent is a specialized AI persona with:
- **System prompt** defining expertise and behavior
- **LLM backend** (Gemini, Claude, Perplexity)
- **Tools** it can invoke
- **Cost profile** for billing

---

## Agent Definition Schema

```typescript
interface Agent {
  id: string;
  name: string;
  role: string;                    // "Bioinformatician", "Market Analyst"
  tier: "free" | "premium";
  
  // LLM Configuration
  llm: {
    provider: "gemini" | "claude" | "perplexity" | "openai";
    model: string;                 // "gemini-1.5-pro", "claude-3-sonnet"
    temperature: number;
    maxTokens: number;
  };
  
  // Persona
  systemPrompt: string;
  personality: {
    style: string;                 // "analytical", "creative", "pragmatic"
    responseLength: "concise" | "detailed";
  };
  
  // Capabilities
  tools: string[];                 // ["pubmed_search", "patent_lookup"]
  expertise: string[];             // ["genomics", "CRISPR", "NGS"]
  
  // Billing
  cost: {
    baseCredits: number;           // per message
    toolCredits: Record<string, number>;
  };
}
```

---

## Example Agents

### Free Tier (Gemini + Google Search Grounding)

Gemini models support built-in Google Search grounding, enabling free tier agents to search the web and cite sources without external APIs.

```yaml
Molecular Biologist:
  llm: gemini-1.5-pro
  tier: free
  expertise: [cell biology, protein structure, pathways]
  tools: [google_search]  # Built-in Gemini grounding
  systemPrompt: |
    You are a molecular biologist with expertise in cellular mechanisms,
    protein interactions, and biological pathways. Provide scientifically
    rigorous insights while remaining accessible. Always cite your reasoning.

R&D Strategist:
  llm: gemini-1.5-pro
  tier: free
  expertise: [research planning, experimental design]
  tools: [google_search]
  systemPrompt: |
    You are an R&D strategist helping researchers plan experiments and
    prioritize research directions. Focus on practical, actionable advice.

Literature Analyst (Free):
  llm: gemini-1.5-pro
  tier: free
  expertise: [literature review, research synthesis]
  tools: [google_search]  # Google Search grounding for citations
  systemPrompt: |
    You are a literature research assistant. Search and synthesize scientific
    literature using web search. Provide citations and links when available.
    Summarize key findings and identify research gaps.
```

### Premium Tier (Claude/Perplexity)

```yaml
Bioinformatician:
  llm: claude-3-sonnet
  tier: premium
  cost: 3-5 credits/message
  expertise: [genomics, NGS, pipeline design, statistics]
  tools: [code_execution, ncbi_search]
  systemPrompt: |
    You are a senior bioinformatician with deep expertise in genomic analysis,
    NGS pipelines, and statistical methods. You can write and explain code.
    Prefer Python, R, and bash. Reference specific tools (BWA, STAR, DESeq2).

Literature Analyst:
  llm: perplexity-sonar-pro
  tier: premium
  cost: 4-6 credits/message
  expertise: [literature review, citation analysis]
  tools: [pubmed_search, semantic_scholar, google_scholar]
  systemPrompt: |
    You are a literature research specialist. Search and synthesize scientific
    literature. Always provide citations with DOIs when available. Summarize
    key findings and identify research gaps.

Regulatory Expert:
  llm: claude-3-sonnet
  tier: premium
  cost: 4-6 credits/message
  expertise: [FDA, EMA, CMC, IND/NDA]
  tools: [fda_guidance_search]
  systemPrompt: |
    You are a regulatory affairs expert with experience in FDA and EMA
    submissions. Advise on regulatory pathways, CMC requirements, and
    clinical trial design. Reference specific guidance documents.

Market Analyst:
  llm: perplexity-sonar-pro
  tier: premium
  cost: 5-7 credits/message
  expertise: [biotech markets, competitive analysis, commercialization]
  tools: [web_search, company_search]
  systemPrompt: |
    You are a biotech market analyst. Research market trends, competitive
    landscapes, and commercialization strategies. Provide data-driven
    insights with sources.
```

---

## Orchestration Flow

```
User sends message to session
          ↓
┌─────────────────────────────────────────┐
│            ORCHESTRATOR                 │
│  1. Identify active agents in panel     │
│  2. Determine which should respond      │
│  3. Route message to selected agents    │
│  4. Aggregate responses                 │
│  5. Calculate and deduct credits        │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│          AGENT EXECUTOR                 │
│  1. Load agent config + system prompt   │
│  2. Build context (history + tools)     │
│  3. Call LLM via appropriate adapter    │
│  4. Execute any tool calls              │
│  5. Return response + usage metrics     │
└─────────────────────────────────────────┘
```

---

## LLM Adapters

```typescript
interface LLMAdapter {
  provider: string;
  
  // Core method
  complete(
    messages: Message[],
    config: AgentLLMConfig
  ): Promise<{
    content: string;
    usage: { inputTokens: number; outputTokens: number };
    toolCalls?: ToolCall[];
  }>;
  
  // Cost calculation
  calculateCredits(usage: Usage): number;
}

// Implementations
class GeminiAdapter implements LLMAdapter { ... }
class ClaudeAdapter implements LLMAdapter { ... }
class PerplexityAdapter implements LLMAdapter { ... }
```

---

## Tool System

Agents can invoke tools during their response:

### Gemini Google Search Grounding (Free)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Enable Google Search grounding for free web search
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  tools: [{
    googleSearch: {}  // Built-in, no extra cost
  }]
});

const result = await model.generateContent(prompt);

// Access grounding metadata (citations)
const sources = result.response.candidates[0].groundingMetadata;
```

### Custom Tools (Premium)

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: JSONSchema;
  credits: number;              // cost per invocation
  
  execute(params: any): Promise<ToolResult>;
}

// Example premium tools
const tools = {
  pubmed_search: {
    credits: 1,
    execute: async ({ query }) => searchPubMed(query)
  },
  patent_lookup: {
    credits: 2,
    execute: async ({ query }) => searchPatents(query)
  },
  fda_guidance_search: {
    credits: 1,
    execute: async ({ topic }) => searchFDAGuidance(topic)
  },
  semantic_scholar: {
    credits: 2,
    execute: async ({ query }) => searchSemanticScholar(query)
  }
};
```

---

## Response Modes

### 1. Round-Robin (default)
Each agent in the panel responds in turn.

### 2. Selective
Orchestrator picks 1-2 most relevant agents based on message content.

### 3. Collaborative
Agents build on each other's responses (more credits, deeper insights).

---

## Free Tier Limits

| Limit | Value |
|-------|-------|
| Agents | Gemini-powered only |
| Messages/day | 50 |
| Search | Google Search grounding (built-in) |
| Session history | 20 messages |
| Premium tools | ❌ (PubMed API, Semantic Scholar, etc.) |

---

## Tech Stack Recommendation

| Component | Technology |
|-----------|------------|
| Backend | Node.js / Python FastAPI |
| LLM SDKs | `@google/generative-ai`, `@anthropic-ai/sdk`, `openai` |
| Database | PostgreSQL (users, credits) + Redis (session state) |
| Queue | BullMQ (for async agent execution) |
| Payments | Stripe |
