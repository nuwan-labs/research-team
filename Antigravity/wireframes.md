# Scientific Research Orchestrator - Wireframes

## Table of Contents
1. [Main Layout Overview](#1-main-layout-overview)
2. [Agent Sidebar (Left Panel)](#2-agent-sidebar-left-panel)
3. [Chat Area (Center Panel)](#3-chat-area-center-panel)
4. [Mission Control (Right Panel)](#4-mission-control-right-panel)
5. [Component States](#5-component-states)
6. [Modals & Overlays](#6-modals--overlays)
7. [Responsive Considerations](#7-responsive-considerations)

---

## 1. Main Layout Overview

### 1.1 Full Application Layout (Desktop - 1440px+)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌─────────────────────────────────────────────────┐ ┌────────────────────┐ │
│ │              │ │                                                 │ │                    │ │
│ │   AGENT      │ │               CHAT AREA                         │ │   MISSION          │ │
│ │   SIDEBAR    │ │                                                 │ │   CONTROL          │ │
│ │              │ │                                                 │ │                    │ │
│ │   280px      │ │               flex-1 (remaining)                │ │   320px            │ │
│ │   fixed      │ │                                                 │ │   fixed            │ │
│ │              │ │                                                 │ │                    │ │
│ │              │ │                                                 │ │                    │ │
│ │              │ │                                                 │ │                    │ │
│ │              │ │                                                 │ │                    │ │
│ │              │ │                                                 │ │                    │ │
│ └──────────────┘ └─────────────────────────────────────────────────┘ └────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
                                    100% viewport height
```

### 1.2 Color Scheme Reference

```
Background (Dark Theme):
├── Base:        slate-900  (#0f172a)
├── Panel:       slate-800  (#1e293b)
├── Card:        slate-700  (#334155)
├── Border:      slate-600  (#475569)
└── Text:        slate-100  (#f1f5f9)

Agent Colors:
├── Project Manager:     indigo-500   (#6366f1)
├── Market Analyst:      emerald-500  (#10b981)
├── Statistician:        cyan-500     (#06b6d4)
├── Comp. Biologist:     blue-500     (#3b82f6)
├── Molecular Biologist: violet-500   (#8b5cf6)
├── Programmer:          slate-400    (#94a3b8)
├── Literature Spec.:    amber-500    (#f59e0b)
├── Business Strategist: green-700    (#15803d)
├── Regulatory Expert:   orange-500   (#f97316)
├── Clinician:           red-500      (#ef4444)
├── Ethics Expert:       rose-500     (#f43f5e)
├── Summarizer:          gray-500     (#6b7280)
└── Custom Agents:       pink-500     (#ec4899)

Accents:
├── Primary Action:      blue-500     (#3b82f6)
├── Success:             emerald-500  (#10b981)
├── Warning:             amber-500    (#f59e0b)
└── Error:               red-500      (#ef4444)
```

---

## 2. Agent Sidebar (Left Panel)

### 2.1 Default State

```
┌──────────────────────────────┐
│  Expert Panel                │  ← Title (text-lg, font-bold)
│  ─────────────────────────── │
│  Activate experts to join    │  ← Subtitle (text-sm, text-slate-400)
│  your research panel         │
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ PM  Project Manager  │✓ │  ← Active (highlighted bg)
│  │      Orchestrates team  │  │
│  │      milestones & tasks │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ MA  Market Analyst   │☐ │  ← Inactive (dimmed)
│  │      Market research &  │  │
│  │      competition data   │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ ST  Statistician     │☐ │
│  │      Statistical        │  │
│  │      analysis & rigor   │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ CB  Comp. Biologist  │☐ │
│  │      Bioinformatics &   │  │
│  │      genomics analysis  │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ MB  Molecular Bio    │✓ │  ← Active by default
│  │      Wet-lab protocols  │  │
│  │      & experimental     │  │
│  └────────────────────────┘  │
│                              │
│         ... scroll ...       │  ← Remaining agents
│                              │
│  ┌────────────────────────┐  │
│  │ ⬤ SEC Summarizer       │✓ │  ← Active by default
│  │      Documentation &    │  │
│  │      synthesis          │  │
│  └────────────────────────┘  │
│                              │
│  ┌┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐  │  ← Dashed border
│  │    + Create Specialist  │  │
│  └┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘  │
│                              │
└──────────────────────────────┘
```

### 2.2 Agent Card Detail

```
Active Agent Card:
┌────────────────────────────────────┐
│  ┌────┐                            │
│  │ PM │  Project Manager     [✓]   │  ← Checkbox checked
│  └────┘                            │
│  ─────────────────────────────────│  ← Colored top border (indigo)
│  Orchestrates team milestones      │
│  and task delegation               │
│                                    │
│  bg: slate-700/50                  │
│  border-l-4: agent color           │
└────────────────────────────────────┘

Inactive Agent Card:
┌────────────────────────────────────┐
│  ┌────┐                            │
│  │ MA │  Market Analyst      [☐]   │  ← Checkbox unchecked
│  └────┘                            │
│                                    │
│  Market research and               │  ← Text dimmed (opacity-50)
│  competition analysis              │
│                                    │
│  bg: slate-800                     │
│  opacity: 0.6                      │
└────────────────────────────────────┘
```

### 2.3 Avatar Design

```
Agent Avatar (40x40px):
┌────────────────┐
│                │
│      PM        │  ← 2-letter initials
│                │
└────────────────┘
   └─ bg-indigo-500, text-white,
      rounded-full, font-semibold

Code Execution Badge (agents with code capability):
┌────────────────┐
│      ST    ⚙   │  ← Small gear icon top-right
│                │
└────────────────┘

Web Search Badge (agents with web search):
┌────────────────┐
│      MB    🔍   │  ← Small search icon
│                │
└────────────────┘
```

---

## 3. Chat Area (Center Panel)

### 3.1 Header Bar

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│    🧬  Scientific Orchestrator              ┌──┬──┬──┬──┬──┐  +2      │
│        Multi-Agent Research Cockpit         │PM│MB│SE│  │  │          │
│                                             └──┴──┴──┴──┴──┘          │
│                                                 ↑                      │
│                                          Overlapping avatar stack      │
│                                          (first 5 active agents)       │
│                                          "+N" if more than 5           │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Message Area - Chat Messages

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  System Message (Welcome)                                       │   │
│  │  ─────────────────────────────────────────────────────────────  │   │
│  │  Welcome to the Scientific Research Orchestrator! 🧬            │   │
│  │                                                                 │   │
│  │  You're leading a panel of AI experts. Get started by:          │   │
│  │  • Typing a research question below                            │   │
│  │  • Clicking "Direct Ask" to consult specific experts           │   │
│  │  • Toggling experts in the sidebar to customize your panel     │   │
│  │                                                                 │   │
│  │  Your active panel: Project Manager, Molecular Biologist,      │   │
│  │  Summarizer                                                    │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│                                                                        │
│                        ┌─────────────────────────────────────────────┐ │
│                        │                                      ME     │ │
│                        │                                    14:32    │ │
│                        │  ─────────────────────────────────────────  │ │
│                        │  I want to research CRISPR-based gene      │ │
│                        │  therapy for sickle cell disease. What     │ │
│                        │  should be our first steps?                │ │
│                        │                                             │ │
│                        │                        bg: blue-600/80      │ │
│                        └─────────────────────────────────────────────┘ │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  ┌────┐                                                          │  │
│  │  │ PM │  Project Manager                              14:33      │  │
│  │  └────┘                                                          │  │
│  │  ─────────────────────────────────────────────────────────────── │  │
│  │                                                                  │  │
│  │  Excellent choice! CRISPR-based gene therapy for sickle cell    │  │
│  │  disease is a rapidly advancing field. Let me coordinate our    │  │
│  │  initial approach:                                              │  │
│  │                                                                  │  │
│  │  **Phase: Brainstorm**                                          │  │
│  │                                                                  │  │
│  │  First, I'm delegating initial tasks:                           │  │
│  │                                                                  │  │
│  │  * **Molecular Biologist:** Review current CRISPR delivery      │  │
│  │    mechanisms for hematopoietic stem cells                      │  │
│  │                                                                  │  │
│  │  * **Summarizer:** Prepare a brief overview of recent FDA       │  │
│  │    approved gene therapies                                      │  │
│  │                                                                  │  │
│  │  [NEW_OBJECTIVE: Review existing CRISPR clinical trials]        │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐    │  │
│  │  │  📚 Sources & References                                 │    │  │
│  │  │  • NIH CRISPR Gene Therapy Overview                     │    │  │
│  │  │  • ClinicalTrials.gov - Sickle Cell CRISPR Studies     │    │  │
│  │  └─────────────────────────────────────────────────────────┘    │  │
│  │                                                                  │  │
│  │                                              bg: slate-700       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│         ... more messages ...                                          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Input Area

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   Direct Ask:                                                          │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                     │
│   │ ● PM        │ │ ● MB        │ │ ● SEC       │                     │
│   └─────────────┘ └─────────────┘ └─────────────┘                     │
│       ↑               ↑               ↑                               │
│    indigo dot      violet dot      gray dot                           │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────┐ ┌────┐ │
│   │                                                          │ │ ➤  │ │
│   │  Type your message...                                    │ │    │ │
│   │                                                          │ │    │ │
│   └──────────────────────────────────────────────────────────┘ └────┘ │
│       ↑                                                         ↑     │
│   Multi-line textarea (3 lines visible)                  Send button  │
│   Placeholder: "Ask your research panel..."              (disabled    │
│                                                          when empty)  │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Processing State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ... previous messages ...                                             │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  ┌────┐                                                          │  │
│  │  │ MB │  Molecular Biologist is researching...                   │  │
│  │  └────┘                                                          │  │
│  │                                                                  │  │
│  │     ●  ●  ●                                                      │  │
│  │     ↑                                                            │  │
│  │  Animated dots (thinking indicator)                              │  │
│  │                                                                  │  │
│  │  Or streaming text appears here as it's generated                │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│   Direct Ask:                                                          │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                     │
│   │ ● PM        │ │ ● MB        │ │ ● SEC       │  ← All disabled     │
│   └─────────────┘ └─────────────┘ └─────────────┘    (opacity: 0.5)   │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────┐ ┌────┐ │
│   │                                                          │ │ ⏳ │ │
│   │  Panel is discussing...                                  │ │    │ │ ← Disabled
│   │                                                          │ │    │ │
│   └──────────────────────────────────────────────────────────┘ └────┘ │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Mission Control (Right Panel)

### 4.1 Complete Panel Layout

```
┌──────────────────────────────────┐
│  Mission Control    [📄 Export]  │  ← Title + Export button
│  ════════════════════════════════│
│                                  │
│  CURRENT PHASE                   │
│  ┌────────────────────────────┐  │
│  │  🧠 Brainstorm             │  │
│  │     12:34 elapsed          │  │  ← Timer since phase start
│  └────────────────────────────┘  │
│                                  │
│  PHASE PROGRESS                  │
│  ┌────────────────────────────┐  │
│  │ [●]──[○]──[○]──[○]──[○]    │  │  ← Clickable phase stepper
│  │  BS   HG   ED   EV   CN    │  │
│  └────────────────────────────┘  │
│   ↑     ↑    ↑    ↑    ↑        │
│  Brain Hypo Expe Eval Conc      │
│  storm thesis sign luat clus     │
│        Gen.  .    ion  ion       │
│                                  │
│  ────────────────────────────────│
│                                  │
│  OBJECTIVES (2/5)                │
│  ┌────────────────────────────┐  │
│  │ [✓] Define clear research  │  │  ← Completed (strikethrough)
│  │     question               │  │
│  │     by Project Manager     │  │
│  │                            │  │
│  │ [✓] Identify key variables │  │
│  │     & constraints          │  │
│  │     by User                │  │
│  │                            │  │
│  │ [ ] Formulate testable     │  │  ← Pending
│  │     hypothesis             │  │
│  │                            │  │
│  │ [ ] Outline experimental   │  │
│  │     approach               │  │
│  │                            │  │
│  │ [ ] Assess feasibility     │  │
│  │     & risks                │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ + Add objective...         │  │  ← Input field
│  └────────────────────────────┘  │
│                                  │
│  ────────────────────────────────│
│                                  │
│  DELEGATED TASKS                 │
│                                  │
│  Pending:                        │
│  ┌────────────────────────────┐  │
│  │ 🟠 Molecular Biologist     │  │  ← Amber indicator
│  │    Review CRISPR delivery  │  │
│  │    mechanisms              │  │
│  │    2 min ago               │  │
│  │                            │  │
│  │ 🟠 Summarizer              │  │
│  │    Prepare FDA gene        │  │
│  │    therapy overview        │  │
│  │    2 min ago               │  │
│  └────────────────────────────┘  │
│                                  │
│  Completed:                      │
│  ┌────────────────────────────┐  │
│  │ 🟢 Literature Specialist   │  │  ← Green indicator
│  │    ~~Find recent papers~~  │  │     Strikethrough
│  │    5 min ago               │  │
│  │                            │  │
│  │ +2 more completed          │  │  ← Collapsed count
│  └────────────────────────────┘  │
│                                  │
│  ────────────────────────────────│
│                                  │
│  PANEL HEALTH                    │
│  ┌────────────────────────────┐  │
│  │  Velocity     Rigor        │  │
│  │  ┌────┐      ┌────────┐    │  │
│  │  │ 8  │msgs  │ 72%    │    │  │
│  │  └────┘      │████████│    │  │  ← Green progress bar
│  │   /5min      └────────┘    │  │
│  │                            │  │
│  │  Agent Balance             │  │
│  │  ┌────────────────────┐    │  │
│  │  │██████░░░░███░░░░░░│    │  │  ← Stacked bar chart
│  │  └────────────────────┘    │  │
│  │   PM 45%  MB 30%  SEC 25%  │  │
│  └────────────────────────────┘  │
│                                  │
│  ────────────────────────────────│
│                                  │
│  ALERTS                          │
│  ┌────────────────────────────┐  │
│  │ ⚠️ WARNING                  │  │  ← Amber background
│  │ Discussion drifting from   │  │
│  │ main research objective    │  │
│  │                            │  │
│  │ ℹ️ INFO                     │  │  ← Blue background
│  │ Consider adding regulatory │  │
│  │ expert to the panel        │  │
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

### 4.2 Phase Stepper Detail

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌───┐     ┌───┐     ┌───┐     ┌───┐     ┌───┐               │
│   │ ● │─────│ ○ │─────│ ○ │─────│ ○ │─────│ ○ │               │
│   └───┘     └───┘     └───┘     └───┘     └───┘               │
│     ↑         ↑         ↑         ↑         ↑                 │
│  Current   Clickable (triggers confirmation dialog)            │
│  (filled)  (hollow)                                            │
│                                                                 │
│   Labels below each:                                           │
│   BS        HG         ED        EV        CN                  │
│   Brain-    Hypothesis Experi-   Evalu-    Conclu-            │
│   storm     Generation mental    ation     sion                │
│                        Design                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Health Metrics Detail

```
Velocity Card:
┌───────────────────┐
│   8              │
│   msgs/5min      │
└───────────────────┘

Rigor Score Card:
┌───────────────────────────┐
│  Rigor: 72%               │
│  ┌─────────────────────┐  │
│  │████████████████░░░░│  │  ← Green (>70%)
│  └─────────────────────┘  │
└───────────────────────────┘

Color coding:
- Green:  >70%  (high rigor)
- Amber:  40-70% (moderate)
- Red:    <40%  (low rigor)

Agent Balance Bar:
┌─────────────────────────────────────┐
│  ┌──────────────────────────────┐   │
│  │██████████░░░░░░██████░░░░░░░│   │
│  └──────────────────────────────┘   │
│   PM (45%)    MB (30%)   SEC (25%)  │
│   indigo      violet      gray      │
│                                     │
│  Legend (agents with >0%):          │
│  ● PM  ● MB  ● SEC                  │
└─────────────────────────────────────┘
```

---

## 5. Component States

### 5.1 Button States

```
Primary Button (Send):
┌─────────────────────────────────────────────────────────────────┐
│  Default:        Hover:           Disabled:        Loading:     │
│  ┌────────┐     ┌────────┐       ┌────────┐       ┌────────┐   │
│  │   ➤    │     │   ➤    │       │   ➤    │       │   ⏳   │   │
│  └────────┘     └────────┘       └────────┘       └────────┘   │
│  bg-blue-600    bg-blue-500      bg-slate-600    bg-blue-600   │
│                 scale(1.02)      opacity-50       cursor-wait  │
└─────────────────────────────────────────────────────────────────┘

Direct Ask Button:
┌─────────────────────────────────────────────────────────────────┐
│  Default:        Hover:           Disabled:                     │
│  ┌─────────┐    ┌─────────┐      ┌─────────┐                   │
│  │ ● PM    │    │ ● PM    │      │ ● PM    │                   │
│  └─────────┘    └─────────┘      └─────────┘                   │
│  bg-slate-700   bg-slate-600     opacity-50                    │
│  border-slate   ring-blue-500    cursor-not-allowed            │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Checkbox States

```
Agent Toggle Checkbox:
┌─────────────────────────────────────────────────────────────────┐
│  Unchecked:      Checked:         Hover (unchecked):            │
│    ┌───┐          ┌───┐            ┌───┐                        │
│    │   │          │ ✓ │            │   │                        │
│    └───┘          └───┘            └───┘                        │
│  border-slate    bg-blue-500      ring-blue-400                 │
│                  text-white       ring-2                        │
└─────────────────────────────────────────────────────────────────┘

Objective Checkbox:
┌─────────────────────────────────────────────────────────────────┐
│  Unchecked:      Checked:                                       │
│    ┌───┐          ┌───┐                                         │
│    │   │          │ ✓ │  + text-decoration: line-through        │
│    └───┘          └───┘  + text-slate-400                       │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Input States

```
Text Input:
┌─────────────────────────────────────────────────────────────────┐
│  Default:                         Focus:                        │
│  ┌──────────────────────┐        ┌──────────────────────┐      │
│  │ Placeholder text...  │        │ |                    │      │
│  └──────────────────────┘        └──────────────────────┘      │
│  border-slate-600                 ring-2 ring-blue-500          │
│  bg-slate-800                     bg-slate-700                  │
│                                                                 │
│  Disabled:                                                      │
│  ┌──────────────────────┐                                      │
│  │ Panel is discussing..│                                      │
│  └──────────────────────┘                                      │
│  opacity-50, cursor-not-allowed                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Message Bubble States

```
User Message:
┌─────────────────────────────────────────────────────────────────┐
│                                        ┌────────────────────┐   │
│                                        │  Message content   │   │
│                                        │                    │   │
│                                        │  bg-blue-600/80    │   │
│                                        │  rounded-lg        │   │
│                                        │  text-right align  │   │
│                                        └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Agent Message:
┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────┐                            │
│  │  Message content               │                            │
│  │                                │                            │
│  │  bg-slate-700                  │                            │
│  │  rounded-lg                    │                            │
│  │  text-left align               │                            │
│  │  border-l-4 (agent color)      │                            │
│  └────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘

System Message:
┌─────────────────────────────────────────────────────────────────┐
│        ┌────────────────────────────────┐                      │
│        │  System notification           │                      │
│        │                                │                      │
│        │  bg-slate-800                  │                      │
│        │  border-dashed border-slate-600│                      │
│        │  text-center                   │                      │
│        └────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Modals & Overlays

### 6.1 Create Custom Agent Modal

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  Create Custom Specialist                          [X]   │   │
│  │  ═══════════════════════════════════════════════════════│   │
│  │                                                          │   │
│  │  Name *                                                  │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ e.g., Pharmacologist                             │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  Short Description *                                     │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ Brief description for sidebar (1-2 lines)        │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  System Prompt *                                         │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │                                                   │   │   │
│  │  │  Define this agent's expertise, personality,     │   │   │
│  │  │  and how they should behave in conversations...  │   │   │
│  │  │                                                   │   │   │
│  │  │                                                   │   │   │
│  │  │                                                   │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────────────────────┐     │   │
│  │  │   Cancel     │  │   Create Agent               │     │   │
│  │  └──────────────┘  └──────────────────────────────┘     │   │
│  │   bg-slate-700      bg-blue-600                          │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Background: bg-black/50 (overlay)                             │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Phase Change Confirmation

```
Browser Native Confirm Dialog:
┌───────────────────────────────────────────────────┐
│                                                   │
│  ⚠️ Change Phase?                                 │
│                                                   │
│  Are you sure you want to change the research    │
│  phase to "Hypothesis Generation"?               │
│                                                   │
│  This will reset the phase timer.                │
│                                                   │
│            ┌────────┐  ┌────────┐                │
│            │ Cancel │  │   OK   │                │
│            └────────┘  └────────┘                │
│                                                   │
└───────────────────────────────────────────────────┘
```

### 6.3 Export Report Preview

```
Plain Text Export:
┌────────────────────────────────────────────────────────────────┐
│  ══════════════════════════════════════════════════════════   │
│  SCIENTIFIC RESEARCH ORCHESTRATOR - PROJECT REPORT             │
│  Generated: 2025-01-15 14:45:00                               │
│  ══════════════════════════════════════════════════════════   │
│                                                                │
│  CURRENT PHASE: Brainstorm (12:34 elapsed)                    │
│                                                                │
│  OBJECTIVES:                                                   │
│  [✓] Define clear research question (by Project Manager)      │
│  [✓] Identify key variables & constraints (by User)           │
│  [ ] Formulate testable hypothesis                            │
│  [ ] Outline experimental approach                            │
│  [ ] Assess feasibility & risks                               │
│                                                                │
│  ACTION ITEMS:                                                 │
│  [PENDING] Molecular Biologist: Review CRISPR delivery        │
│  [PENDING] Summarizer: Prepare FDA overview                   │
│  [DONE] Literature Specialist: Find recent papers             │
│                                                                │
│  ══════════════════════════════════════════════════════════   │
└────────────────────────────────────────────────────────────────┘
```

---

## 7. Responsive Considerations

### 7.1 Tablet Layout (768px - 1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐ ┌───────────────────┐ │
│  │                                     │ │                   │ │
│  │           CHAT AREA                 │ │   MISSION         │ │
│  │                                     │ │   CONTROL         │ │
│  │                                     │ │   (collapsible)   │ │
│  │                                     │ │                   │ │
│  └─────────────────────────────────────┘ └───────────────────┘ │
│                                                                 │
│  Agent Sidebar → Horizontal bar at top or slide-out drawer     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Mobile Layout (<768px)

```
┌─────────────────────────────────┐
│  ┌─────────────────────────────┐│
│  │ 🧬 Scientific Orchestrator  ││
│  │  ≡ (hamburger menu)    👥   ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │       CHAT AREA             ││
│  │    (full width)             ││
│  │                             ││
│  │                             ││
│  │                             ││
│  │                             ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ [Direct Ask buttons...]     ││
│  │ ┌───────────────────┐ ┌──┐ ││
│  │ │ Message input     │ │➤ │ ││
│  │ └───────────────────┘ └──┘ ││
│  └─────────────────────────────┘│
│                                 │
│  Bottom sheet / drawer for:     │
│  • Agent Sidebar (swipe up)     │
│  • Mission Control (tab)        │
│                                 │
└─────────────────────────────────┘
```

### 7.3 Mobile Bottom Navigation

```
┌─────────────────────────────────┐
│                                 │
│     (main content area)         │
│                                 │
├─────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐     │
│  │ 💬  │  │ 👥  │  │ 📊  │     │
│  │Chat │  │Panel│  │Track│     │
│  └─────┘  └─────┘  └─────┘     │
└─────────────────────────────────┘
```

---

## 8. Interaction Flows

### 8.1 Send Message Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  User types  │───→│  User sends  │───→│  UI shows    │
│  message     │    │  (Enter/btn) │    │  processing  │
└──────────────┘    └──────────────┘    └──────────────┘
                                              │
                                              ▼
                    ┌──────────────┐    ┌──────────────┐
                    │  Signals     │←───│  Agent       │
                    │  parsed      │    │  responds    │
                    └──────────────┘    └──────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ Update   │   │ Update   │   │ Create   │
    │ phase    │   │ objectives│  │ tasks    │
    └──────────┘   └──────────┘   └──────────┘
```

### 8.2 Direct Ask Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  User clicks │───→│  System adds │───→│  Specific    │
│  "Direct Ask"│    │  prompt tag  │    │  agent       │
│  for agent   │    │  to message  │    │  responds    │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 8.3 Agent Toggle Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  User clicks │───→│  State       │───→│  UI updates: │
│  agent       │    │  updated     │    │  • Sidebar   │
│  checkbox    │    │              │    │  • Header    │
└──────────────┘    └──────────────┘    │  • Ask btns  │
                                        └──────────────┘
```

---

## 9. Accessibility Notes

### 9.1 Keyboard Navigation

```
Tab Order:
1. Agent sidebar checkboxes (top to bottom)
2. Create Specialist button
3. Direct Ask buttons (left to right)
4. Message input
5. Send button
6. Mission Control interactive elements

Keyboard Shortcuts:
• Enter: Send message (when input focused)
• Shift+Enter: New line
• Escape: Close modals
```

### 9.2 Screen Reader Landmarks

```
<header>    → Chat header with app title
<nav>       → Agent sidebar
<main>      → Chat message area
<aside>     → Mission Control panel
<footer>    → Input area with Direct Ask buttons
```

### 9.3 ARIA Labels

```
• Agent checkbox: "Toggle [Agent Name] agent"
• Direct Ask button: "Directly ask [Agent Name]"
• Send button: "Send message"
• Phase segment: "[Phase Name] - click to change phase"
• Objective checkbox: "[Objective text] - [status]"
```

---

## 10. Animation Specifications

### 10.1 Transitions

```
Agent card hover:
- transform: scale(1.02)
- transition: 150ms ease-out

Message appearance:
- opacity: 0 → 1
- transform: translateY(10px) → translateY(0)
- transition: 200ms ease-out

Panel collapse/expand (mobile):
- max-height animation
- transition: 300ms ease-in-out

Checkbox toggle:
- scale bounce effect
- transition: 100ms
```

### 10.2 Loading Indicators

```
Thinking dots animation:
●  ●  ●
↑
Dots pulse with 0.6s delay between each
opacity: 0.3 → 1 → 0.3

Processing spinner:
⟳ (rotating)
animation: spin 1s linear infinite

Streaming text:
Cursor blink at end of text
animation: blink 1s step-end infinite
```
