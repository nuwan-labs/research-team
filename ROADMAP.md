# Product Development Roadmap

## Development Philosophy

Build in vertical slices - each phase delivers a working product that real users can test. Validate assumptions before investing in features.

---

## Phase 1: Validated Core (Weeks 1-4)

### Goal
Prove the core value proposition: "Multi-agent collaboration produces better research outcomes than single-agent chat."

### What to Build
- Single-page app with chat interface
- 3-4 hardcoded agents (Project Manager, one domain expert, Summarizer)
- Basic agent switching (no activation/deactivation yet)
- Simple message history
- AI integration with web search

### What to Skip
- Project tracking panel
- Signal parsing system
- Custom agents
- Health metrics
- Persistence

### Validation Questions
- Do users naturally want to switch between experts?
- Does the PM coordination add value or feel like friction?
- What domains do early users actually want?

### Success Metrics
- Users send 10+ messages per session
- Users switch agents at least 3 times per session
- Qualitative: "This is better than ChatGPT for research"

---

## Phase 2: Panel Assembly (Weeks 5-8)

### Goal
Let users compose their own expert teams and validate which agent combinations are valuable.

### What to Build
- Agent sidebar with activation toggles
- Expand to 6-8 agents based on Phase 1 feedback
- Direct Ask buttons for targeted queries
- Agent awareness of who else is on the panel
- Basic error handling

### What to Skip
- Project tracking (still)
- Custom agents
- Persistence

### Validation Questions
- Which agent combinations are most common?
- Do users want agents we haven't built?
- How many agents do users typically activate?

### Success Metrics
- Average 4+ agents activated per session
- Clear patterns in agent combinations emerge
- Session length increases vs Phase 1

---

## Phase 3: Project State (Weeks 9-12)

### Goal
Add lightweight project management that agents can update automatically.

### What to Build
- Research phase indicator (manual switching first)
- Objectives list (user-managed)
- Signal parsing for `[PHASE:]` and `[COMPLETED:]`
- PM agent trained to emit signals
- Export report feature

### What to Skip
- Delegated tasks tracking
- Health metrics
- Alerts
- Custom agents

### Validation Questions
- Do users actually use the phase tracking?
- Are agent-emitted signals accurate and helpful?
- Does the PM role become more valuable with state tracking?

### Success Metrics
- 50%+ of sessions use phase transitions
- Users complete 2+ objectives per session
- Export feature used in 20%+ of sessions

---

## Phase 4: Delegation & Collaboration (Weeks 13-16)

### Goal
Enable true multi-agent workflows where agents assign tasks to each other.

### What to Build
- Delegation parsing (`* **Agent:** task`)
- Action items panel (pending/completed)
- Auto-completion when assigned agent responds
- `[NEW_OBJECTIVE:]` and `[ALERT:]` signals
- All 12 predefined agents

### What to Skip
- Custom agents (still)
- Health metrics
- Persistence

### Validation Questions
- Do delegation patterns emerge naturally?
- Is auto-completion logic accurate enough?
- Which agents delegate to which most often?

### Success Metrics
- 3+ delegations per extended session
- Auto-completion accuracy >80%
- Users report feeling like they're "leading a team"

---

## Phase 5: Custom Agents & Polish (Weeks 17-20)

### Goal
Enable power users to create domain-specific experts and polish the experience.

### What to Build
- Custom agent creation modal
- Health metrics (velocity, rigor score, balance)
- UI polish and animations
- Mobile-responsive layout
- Performance optimization

### Validation Questions
- What custom agents do users create?
- Are health metrics useful or ignored?
- What's the learning curve for new users?

### Success Metrics
- 30%+ of power users create custom agents
- Session length >30 minutes for engaged users
- NPS score >40

---

## Phase 6: Persistence & Accounts (Weeks 21-26)

### Goal
Enable users to return to previous research sessions.

### What to Build
- User authentication
- Conversation persistence
- Project state persistence
- Multiple projects per user
- Resume previous sessions

### Key Decisions
- Self-hosted vs cloud database
- Authentication provider
- Data retention policies
- Privacy considerations for research data

### Success Metrics
- 40%+ of users return within 7 days
- Average 3+ projects per active user
- Session resume rate >60%

---

## Phase 7: Collaboration & Sharing (Weeks 27-32)

### Goal
Enable team-based research workflows.

### What to Build
- Shareable project links (read-only)
- Real-time collaboration (multiple users)
- Role-based permissions
- Comment/annotation system
- Team workspaces

### Key Decisions
- Real-time sync technology
- Conflict resolution strategy
- Pricing model for teams

---

## Phase 8: Integrations & API (Weeks 33-40)

### Goal
Connect to the broader research ecosystem.

### What to Build
- Export to common formats (PDF, Notion, Google Docs)
- Import existing research/papers
- API for programmatic access
- Webhook notifications
- Integration with reference managers (Zotero, Mendeley)

---

## Parallel Workstreams

### Infrastructure (Ongoing)
- Error monitoring and alerting
- Usage analytics
- Cost tracking (AI API spend per user)
- Rate limiting
- Caching for repeated queries

### Content & Training (Ongoing)
- Agent prompt refinement based on user feedback
- Domain-specific knowledge bases
- Example projects and templates
- Documentation and tutorials

### Business (Starting Phase 3)
- Pricing model exploration
- Cost structure analysis
- Competitive positioning
- User interviews and feedback loops

---

## Key Technical Decisions to Make Early

### 1. AI Provider Strategy
- Single provider (Gemini) vs multi-provider
- Fallback strategy for outages
- Cost optimization (caching, model selection)

### 2. Deployment Model
- Fully managed SaaS
- Self-hostable option
- Hybrid (data stays local, AI in cloud)

### 3. Target Platforms
- Web-first vs desktop app
- Mobile strategy (responsive vs native)
- Offline capabilities

### 4. Data Architecture
- Where does conversation data live?
- How to handle sensitive research data?
- Compliance requirements (HIPAA for clinical research?)

---

## Monetization Options

### Freemium Model
- Free: 3 agents, 50 messages/day, no persistence
- Pro ($20/mo): All agents, unlimited messages, persistence, custom agents
- Team ($50/user/mo): Collaboration, shared workspaces, admin controls

### Usage-Based
- Pay per message or per AI token
- Transparent cost pass-through + margin
- Good for heavy users, unpredictable for budgeting

### Enterprise
- Self-hosted deployment
- Custom agent development
- SSO and compliance features
- Dedicated support

### Research Institution Licenses
- University-wide access
- Integration with institutional systems
- Volume discounts

---

## Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|------------|
| AI API costs spiral | Implement hard limits, caching, model tiering |
| Response quality inconsistent | Prompt versioning, A/B testing, human review |
| Context window limits | Summarization, selective history |

### Product Risks
| Risk | Mitigation |
|------|------------|
| Users don't switch agents | Remove friction, auto-suggest agents |
| PM feels like overhead | Make PM optional, direct-to-expert mode |
| Custom agents are low quality | Templates, guardrails, community sharing |

### Business Risks
| Risk | Mitigation |
|------|------------|
| Competitors copy quickly | Focus on domain depth, community |
| AI providers change pricing | Multi-provider support, cost buffers |
| Research market too niche | Expand to adjacent use cases |

---

## Adjacent Markets to Explore

If core research use case proves limited:
- **Consulting teams**: Multiple analyst perspectives
- **Education**: Virtual expert panels for learning
- **Creative writing**: Character-based collaboration
- **Legal research**: Multi-specialist legal analysis
- **Investment research**: Analyst teams for due diligence

---

## Immediate Next Steps

1. **Decide target user**: Academic researchers? Biotech startups? Students?
2. **Pick 3-4 initial agents** based on target user needs
3. **Build Phase 1 MVP** in 2-3 weeks
4. **Find 5-10 beta users** for validation
5. **Instrument everything** to understand actual usage patterns
