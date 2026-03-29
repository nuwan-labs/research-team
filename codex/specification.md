# Scientific Research Compiler - Product Specification

## 1. Product Overview

### 1.1 Vision
A research compiler that turns scientific questions into verified, versioned research artifacts. Instead of a chat-first UI, users build and iterate on structured research outputs (hypotheses, protocols, analysis plans, risk/ethics checks) with automated tests and provenance tracking.

### 1.2 Core Value Proposition
- Converts research questions into shippable, structured artifacts
- Enforces evidence-bound output with citations and provenance
- Adds automated checks (ethics, feasibility, statistical power)
- Versioned research builds with pass/fail status
- Team-ready audit trails and exportable reports

---

## 2. User Experience

### 2.1 Initial State
When the application loads:
- Welcome screen explains the “research build” workflow
- A sample project is available with a precompiled build
- The pipeline view opens at the “Question” stage
- A starter template is selectable (Basic, Grant, Clinical, Preclinical)

### 2.2 Primary User Workflows

#### Workflow A: New Research Build
1. User defines a research goal and constraints
2. System compiles baseline artifacts
3. Automated tests run (citations, ethics, feasibility)
4. Build report shows pass/fail with recommendations

#### Workflow B: Iterative Refinement
1. User edits artifacts in the IDE-like editor
2. User re-runs compilation for affected modules
3. Tests re-run with a new versioned build
4. User compares build diff and adopts changes

#### Workflow C: Team Collaboration
1. User assigns modules to teammates (e.g., literature, stats)
2. Each module change creates a new build candidate
3. Reviewer approves or rejects changes

#### Workflow D: Export and Share
1. User exports artifacts as a report bundle
2. Exports include citations, audit logs, and build status

---

## 3. User Interface Layout

### 3.1 Three-Panel IDE Layout

**Left Panel - Pipeline Navigator (Fixed Width)**
- Stages list: Question, Hypotheses, Literature, Methods, Analysis, Risks, Compliance, Report
- Each stage shows status: Not Started, Draft, Compiled, Failing Tests, Passing
- Template switcher at top
- “New Build” button at bottom

**Center Panel - Artifact Editor (Flexible Width)**
- Tabs per artifact (e.g., Hypotheses, Protocol, Analysis Plan)
- Structured editor with sections and inline validation
- Build output console shows compiler logs and test results
- Diff viewer for build comparisons

**Right Panel - Build & Evidence (Fixed Width)**
- Build status (pass/fail, version id, timestamp)
- Test checklist with details and remediation
- Evidence panel listing citations with provenance
- Risk/ethics warnings with severity levels

### 3.2 Artifact Display
Each artifact shows:
- Structured sections and required fields
- Confidence tags for claims
- Source citations inline
- Version metadata and author

### 3.3 Processing State
When compiling:
- Editor locks for the active artifact
- Build console shows progress
- Tests show running state
- Cancel compilation option appears

### 3.4 Visual Design
- Clean, professional, light theme by default
- High-contrast status colors for build and test results
- Minimal chat styling (chat is optional, not primary)

---

## 4. Compiler System

### 4.1 Compiler Modules
Each module produces an artifact and runs tests:
- Question Compiler
- Hypothesis Compiler
- Literature Compiler
- Methods Compiler
- Analysis Compiler
- Risks & Ethics Compiler
- Compliance Compiler
- Report Compiler

### 4.2 Module Properties
- Unique id and name
- Required inputs
- Output artifact schema
- Test suite dependencies
- Provenance requirements

### 4.3 Build Versioning
- Each compile creates a new build version
- Build includes artifacts + test results + citations
- Builds are immutable and comparable

### 4.4 Build Output Summary
- Overall pass/fail
- Failed tests with suggested fixes
- Evidence coverage score
- Reproducibility status

---

## 5. Tests and Validation

### 5.1 Core Tests
- **Citation Coverage**: Claims must have sources
- **Ethics Check**: Flags human/animal research risks
- **Feasibility Check**: Budget/time/availability validation
- **Statistical Power Check**: Required sample size analysis
- **Protocol Completeness**: Controls, replicates, materials

### 5.2 Test Behavior
- Failed tests block “Release Build” status
- Users can override with justification (logged)
- Each test has severity level

---

## 6. Evidence and Provenance

### 6.1 Evidence Requirements
- All external claims must include citations
- Sources include DOI, title, authors, and link
- Evidence grade tags: RCT, Cohort, Preprint, Review

### 6.2 Provenance Tracking
- Each artifact stores sources and compiler metadata
- Build-level audit log records user edits and compiler outputs

---

## 7. Roles and Collaboration

### 7.1 Roles
- **Owner**: Full access, can release builds
- **Contributor**: Edit artifacts, run compiles
- **Reviewer**: Approve/reject changes
- **Viewer**: Read-only

### 7.2 Review Workflow
- Review required for release builds
- Comments and requested changes are tracked per artifact

---

## 8. MCP and Skills System

### 8.1 MCP Gateway
All external access runs through a gateway with per-role and per-module permissions.

### 8.2 Core MCPs
- `project-state` (R/W)
- `citations` (R/W)
- `files` (R)

### 8.3 Domain MCPs (Examples)
- `pubmed`, `arxiv`, `crossref` (R)
- `clinicaltrials`, `drugbank`, `omim` (R)
- `fda`, `ema`, `guidance` (R)
- `protocols`, `reagents` (R)
- `patents`, `funding`, `markets` (R)
- `stats-tooling` (R/W)
- `data-lake` (R)

### 8.4 Skills Model
Each compiler module has a skills profile:
- Allowed MCPs
- Capabilities (search, summarize, compute)
- Output formats (tables, structured JSON)
- Hard limits (no medical advice, no market analysis)

---

## 9. Error Handling

### 9.1 Compiler Errors
- Display module-specific error messages
- Provide remediation suggestions

### 9.2 MCP Errors
- Show which MCP failed and why
- Allow retry or skip with justification

### 9.3 Missing API Key
- Notify user and block affected modules

---

## 10. Data Persistence

### 10.1 Project State
- All artifacts, builds, and tests persisted
- Version history with diffing
- Audit logs for compliance

### 10.2 Configuration
- API keys stored per workspace
- MCP permissions stored per role

---

## 11. Future Considerations

- Automated experiment simulation
- Integrated lab notebook
- Approval workflows for regulated studies
- External peer review
- Continuous monitoring of cited sources for retractions
