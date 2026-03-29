# Scientific Research Orchestrator - Product Specification

## 1. Product Overview

### 1.1 Vision
A web-based multi-agent research cockpit where users lead panels of specialized AI experts to collaboratively solve scientific research problems. The platform orchestrates conversations between domain experts, tracks research progress, and manages project workflow through defined research phases.

### 1.2 Core Value Proposition
- Users can assemble custom expert panels tailored to their research needs
- Each AI agent has a distinct specialty, knowledge domain, and toolset
- Agents can delegate tasks to each other and collaborate
- Built-in project management tracks objectives, phases, and delegated tasks
- Real-time web research and code execution capabilities for certain agents

---

## 2. User Experience

### 2.1 Initial State
When the application loads:
- Display a welcome message explaining how to use the platform
- Three agents are active by default: Project Manager, Molecular Biologist, and Summarizer
- The research phase starts at "Brainstorm"
- Five default objectives are pre-populated (see Section 5.2)

### 2.2 Primary User Workflows

#### Workflow A: General Discussion
1. User types a research question or topic in the input area
2. User presses Enter or clicks send
3. The Project Manager (if active) responds by default
4. User continues the conversation naturally

#### Workflow B: Direct Expert Consultation
1. User clicks a "Direct Ask" button for a specific active agent
2. System generates a prompt directing that agent to provide their expert analysis
3. The specified agent responds with their domain expertise

#### Workflow C: Panel Assembly
1. User activates/deactivates agents via checkboxes in the sidebar
2. Only active agents can respond to messages
3. Active agents are aware of who else is on the panel

#### Workflow D: Custom Agent Creation
1. User clicks "Create Specialist" button
2. Modal appears with fields: Name, Short Description, System Prompt
3. User defines the agent's expertise and personality
4. New agent is added to the panel and automatically activated

---

## 3. User Interface Layout

### 3.1 Three-Panel Layout
The interface consists of three horizontal sections spanning the full viewport height:

**Left Panel - Agent Sidebar (Fixed Width)**
- Title: "Expert Panel"
- Subtitle explaining to activate experts
- Scrollable list of all available agents
- Each agent card shows:
  - Colored avatar with 2-letter initials
  - Agent name
  - Short description (1-2 lines)
  - Checkbox to toggle active/inactive state
- Active agents have highlighted styling
- Inactive agents are visually dimmed
- "Create Specialist" button at bottom (dashed border style)

**Center Panel - Chat Area (Flexible Width)**
- Header bar showing:
  - App title: "Scientific Orchestrator"
  - Subtitle: "Multi-Agent Research Cockpit"
  - Avatar stack showing first 5 active agents (overlapping circles)
  - "+N" indicator if more than 5 agents active
- Scrollable message area
- Messages auto-scroll to bottom on new content
- Input area at bottom:
  - Row of "Direct Ask" buttons (one per active agent with colored dot)
  - Multi-line text input (approximately 3 lines tall)
  - Send button (paper airplane icon)
  - Placeholder text changes when processing

**Right Panel - Project Tracking (Fixed Width)**
- Title: "Mission Control"
- Export Report button
- Current phase display with elapsed time
- Phase progress stepper (5 clickable segments)
- Objectives checklist with completion tracking
- Add objective input field
- Delegated tasks section (pending and completed)
- Panel health metrics section
- Alerts display area

### 3.2 Message Display
Each message shows:
- Avatar (user: "ME", agents: their initials with role color)
- Sender name
- Timestamp (HH:MM format)
- Message content (supports basic text formatting)
- User messages: Right-aligned, colored bubble
- Agent messages: Left-aligned, neutral bubble
- If agent used web search: "Sources & References" section with clickable links

### 3.3 Processing State
When an agent is generating a response:
- Input is disabled
- "Direct Ask" buttons are disabled
- Placeholder shows "Panel is discussing..."
- Animated "thinking" indicator appears in chat
- Shows which agent is currently researching

### 3.4 Visual Design
- Dark theme (dark slate background)
- Accent color for interactive elements
- Each agent has a unique color for their avatar
- Smooth transitions and hover effects
- Clean, professional aesthetic suitable for scientific work

---

## 4. Agent System

### 4.1 Agent Properties
Each agent has:
- Unique identifier
- Display name
- Role category
- 2-letter avatar initials
- Brand color
- Short description (shown in sidebar)
- Detailed system prompt (defines expertise and behavior)
- Active/inactive state
- Custom flag (for user-created agents)

### 4.2 Predefined Agents

#### Project Manager (PM) - Active by Default
- **Color**: Indigo
- **Focus**: Coordination, milestones, decision logging
- **Capabilities**: Gantt charts, milestone tracking, resource allocation, meeting coordination
- **Cannot Do**: Code execution, domain-specific analysis
- **Special Responsibility**: Emits state-tracking signals (see Section 6)

#### Market Analyst (MA)
- **Color**: Emerald
- **Focus**: Market size, competition, customer cohorts
- **Capabilities**: Funding data, VC/M&A info, competitor analysis, trade data
- **Cannot Do**: Code execution, statistics, academic papers, patents, clinical data

#### Statistician (ST)
- **Color**: Cyan
- **Focus**: Statistical analysis, power analysis, rigor
- **Capabilities**: R and Python statistical libraries, effect size databases
- **Can Execute Code**: Yes
- **Cannot Do**: Business data, biological pathway analysis, bioinformatics pipelines

#### Computational Biologist (CB)
- **Color**: Blue
- **Focus**: Bioinformatics, genomics, sequence analysis
- **Capabilities**: Bioinformatics databases (NCBI, Ensembl, PDB, UniProt), sequence tools (BLAST, KEGG)
- **Can Execute Code**: Yes
- **Cannot Do**: Wet-lab protocols, clinical data, market analysis, pure statistics

#### Molecular Biologist (MB) - Active by Default
- **Color**: Violet
- **Focus**: Wet-lab protocols, reagents, experimental design
- **Capabilities**: Protocol databases, reagent databases, lab equipment info
- **Cannot Do**: Code execution, bioinformatics, clinical interpretation, business analysis

#### Programmer (CS)
- **Color**: Slate
- **Focus**: Software engineering, cloud infrastructure, tools
- **Capabilities**: General programming (Python, JS, C++, Go), developer tools, cloud APIs
- **Can Execute Code**: Yes
- **Cannot Do**: Scientific analysis, bioinformatics, business analysis, biology

#### Literature Specialist (LS)
- **Color**: Amber
- **Focus**: Academic search, citation analysis, literature reviews
- **Capabilities**: PubMed, Google Scholar, arXiv, bioRxiv, citation analysis
- **Cannot Do**: Code execution, market research, protocol design, data analysis

#### Business Strategist (BS)
- **Color**: Dark Green
- **Focus**: Patents, funding, IP strategy
- **Capabilities**: Patent databases (USPTO, EPO), funding databases (NIH, NSF, SBIR), IP licensing
- **Cannot Do**: Code execution, statistics, detailed market analysis, technical due diligence

#### Regulatory Expert (RE)
- **Color**: Orange
- **Focus**: FDA/EMA pathways, compliance
- **Capabilities**: FDA databases, international regulatory bodies, clinical trial registries, regulatory guidance
- **Cannot Do**: Code execution, market sizing, statistical analysis, protocol design

#### Clinician (MD)
- **Color**: Red
- **Focus**: Clinical trials, disease mechanisms, patient care
- **Capabilities**: Clinical databases, disease databases (OMIM, Orphanet), drug databases
- **Cannot Do**: Code execution, bioinformatics, regulatory filings, market analysis

#### Ethics Expert (EE)
- **Color**: Rose
- **Focus**: IRB, bioethics, safety
- **Capabilities**: Ethics databases, regulatory ethics (Belmont, Helsinki), case law
- **Cannot Do**: Code execution, scientific analysis, regulatory compliance details, market analysis

#### Summarizer/Secretary (SEC) - Active by Default
- **Color**: Gray
- **Focus**: Documentation, synthesis
- **Capabilities**: Summarization, keyword extraction, structured document generation
- **Cannot Do**: Code execution, any domain analysis
- **Special Note**: Does not have web search capability (synthesizes existing context only)

### 4.3 Custom Agents
- Users can create agents with custom name, description, and system prompt
- Custom agents are assigned a pink color
- Custom agents have web search capability
- Custom agents cannot execute code

### 4.4 Agent Response Selection Logic
When user sends a message:
1. If a specific agent was directly asked, that agent responds
2. Otherwise, if Project Manager is active, they respond
3. Otherwise, the first active agent responds
4. If no agents are active, show system error message

### 4.5 Agent Collaboration Rules
All agents follow these collaboration principles:
1. **Stay in Lane**: Only use capabilities within their domain
2. **Delegate**: Explicitly request help from other active experts when needed
3. **Cite Sources**: Provide URLs or citations when stating facts
4. **Context Awareness**: Consider the full conversation history
5. **Delegation Format**: Use specific format when assigning tasks (see Section 6.3)

---

## 5. Project Management System

### 5.1 Research Phases
The project progresses through five sequential phases:
1. **Brainstorm** - Initial exploration and ideation
2. **Hypothesis Generation** - Formulating testable hypotheses
3. **Experimental Design** - Planning methodology and approach
4. **Evaluation** - Analyzing results and outcomes
5. **Conclusion** - Synthesizing findings and next steps

**Phase Behavior**:
- Current phase is prominently displayed with elapsed time
- Visual stepper shows progress through all phases
- Users can manually change phase by clicking stepper segments (with confirmation)
- Phase timer resets when phase changes

### 5.2 Objectives
Default starting objectives:
1. Define clear research question
2. Identify key variables & constraints
3. Formulate testable hypothesis
4. Outline experimental approach
5. Assess feasibility & risks

**Objective Behavior**:
- Displayed as checklist items
- Users can manually toggle completion
- Shows completion count (e.g., "2/5")
- Completed objectives show who completed them
- Users can add new objectives via input field
- Agents can add objectives or mark them complete via signals

### 5.3 Delegated Tasks (Action Items)
Tasks that agents assign to each other:
- **Pending Tasks**: Highlighted with amber indicator, show assignee and task description
- **Completed Tasks**: Shown with strikethrough styling, green indicator
- Only shows 3 most recent completed tasks
- Shows count of additional completed tasks if more exist
- Timestamps on all tasks

### 5.4 Alerts
Warning messages about the research process:
- Three severity levels: info, warning, critical
- Each shows severity label and message
- Displayed prominently in the tracking panel
- Generated by agents when discussion drifts or risks emerge

### 5.5 Panel Health Metrics

#### Velocity
- Count of messages in the last 5 minutes
- Shows raw number with "msgs" label

#### Rigor Score (0-100%)
- Calculated from the last 10 agent messages
- Factors:
  - Message length (longer = more rigorous, up to 50 points)
  - Presence of source citations (+30 points)
- Displayed as percentage with color coding:
  - Green (>70%): High rigor
  - Amber (40-70%): Moderate rigor
  - Red (<40%): Low rigor
- Visual progress bar

#### Agent Balance
- Horizontal stacked bar showing participation distribution
- Based on message count per active agent
- Legend showing agent initials for agents with >0% participation

### 5.6 Export Report
- Button to download current project status
- Plain text format including:
  - Current phase
  - All objectives with completion status
  - All action items with status and assignee

---

## 6. Signal System

### 6.1 Purpose
Agents (especially the Project Manager) can emit special signals in their messages that automatically update the project tracking panel.

### 6.2 Signal Types

#### Phase Change Signal
- **Format**: `[PHASE: Phase Name]`
- **Effect**: Changes the current research phase and resets timer
- **Valid Values**: Brainstorm, Hypothesis Generation, Experimental Design, Evaluation, Conclusion

#### Objective Completion Signal
- **Format**: `[COMPLETED: objective text]`
- **Effect**: Marks matching objective as complete
- **Matching**: Partial text matching (case-insensitive)
- **Attribution**: Records the agent name who completed it

#### New Objective Signal
- **Format**: `[NEW_OBJECTIVE: Objective Text]`
- **Effect**: Adds new objective to the list

#### Alert Signal
- **Format**: `[ALERT: Warning Message]`
- **Effect**: Creates a new warning-level alert

### 6.3 Delegation Pattern
When agents assign tasks to other agents:
- **Format**: `* **Agent Name:** Task description`
- **Effect**: Creates pending action item assigned to that agent
- **Auto-Completion**: When the assigned agent next responds, their pending tasks are automatically marked as completed
- **Duplicate Prevention**: Same task/assignee combination won't be added if already pending

---

## 7. AI Integration Requirements

### 7.1 Model Selection
Agents use different AI model tiers based on complexity:

**Advanced Model** (for complex reasoning):
- Statistician
- Computational Biologist
- Programmer
- Clinician
- Regulatory Expert
- Literature Specialist

**Standard Model** (for general tasks):
- All other agents

### 7.2 Tool Access

#### Web Search
- Available to all agents EXCEPT Summarizer
- Returns source URLs that are displayed with agent responses

#### Code Execution
- Only available to:
  - Statistician
  - Computational Biologist
  - Programmer

### 7.3 Context Management
- Only the last 15 messages are sent for context
- Each request includes:
  - System instruction with agent identity, role, and rules
  - List of other active agents with their descriptions
  - Formatted conversation transcript
  - Prompt indicating it's the agent's turn

### 7.4 Response Processing
- Extract main text response
- Extract grounding/citation metadata (URLs and titles)
- Parse for signals (phase, objectives, alerts, delegations)
- Update project state based on parsed signals

---

## 8. Error Handling

### 8.1 No Active Agents
If user sends message with no active agents:
- Display system message: "No agents are currently active. Please activate an expert from the sidebar."

### 8.2 API Errors
If AI service fails:
- Display error message from the responding agent
- Reset processing state to allow retry

### 8.3 Missing API Key
- Log error to console
- Agent returns error message about checking API key and connection

---

## 9. Interaction Details

### 9.1 Keyboard Shortcuts
- **Enter**: Send message (when input focused)
- **Shift+Enter**: New line in input (doesn't send)

### 9.2 Input Behavior
- Multi-line text area (resizable is disabled)
- Clears after sending
- Disabled during agent processing
- Send button disabled if empty or processing

### 9.3 Phase Change Confirmation
- Clicking a phase in the stepper triggers browser confirmation dialog
- Only changes phase if user confirms

### 9.4 Objective Toggle
- Clicking checkbox toggles completion
- If manually completed by user, attributed to "User"
- If unchecked, clears attribution

---

## 10. Data Persistence

### 10.1 Session State
The following data exists only for the current session (not persisted):
- All messages in the conversation
- Current list of agents (including custom agents)
- Active/inactive state of each agent
- Project state (phase, objectives, action items, alerts)

### 10.2 Configuration
- AI API key must be configured via environment variable

---

## 11. Future Considerations

These features are not currently implemented but represent natural extensions:
- Persistent storage of conversations and project state
- Multiple concurrent research projects
- Export to various formats (PDF, structured data)
- Agent-to-agent automatic chaining
- Voice input/output
- Collaborative multi-user sessions
- Integration with external research tools and databases
