# Research Compiler - MVP Scope, Milestones, Acceptance Criteria

## MVP Goal
Deliver a non-chat, artifact-first research compiler that produces structured outputs with tests, versioned builds, and exportable reports.

## Scope In
1) Project workspace with pipeline stages
2) Artifact editor with schemas and validation
3) Compiler run with test suite
4) Build versioning + diff view
5) Evidence tracking and citations
6) Export bundle (report + artifacts + audit log)
7) MCP gateway with per-module permissions (read-only default)

## Scope Out
- Multi-tenant billing and payments
- Automated experiment simulation
- Full enterprise SSO
- Multi-project portfolios

---

## Milestone 1: Foundation (Weeks 1-3)

### Deliverables
- Project creation and template selection
- Pipeline navigator UI
- Artifact editor shell (no compile)
- Local data model for artifacts

### Acceptance Criteria
- User can create a project and see pipeline stages
- User can edit artifacts and save drafts
- Stage status updates to Draft on edit

---

## Milestone 2: Compiler + Tests (Weeks 4-6)

### Deliverables
- Compile button per stage
- Compiler log output
- Tests: citation coverage, protocol completeness
- Build version creation

### Acceptance Criteria
- Running compile creates a new build record
- Build report shows pass/fail status
- Failed tests display remediation guidance

---

## Milestone 3: Evidence + Diff (Weeks 7-8)

### Deliverables
- Evidence panel with citation metadata
- Inline citation anchors
- Build diff viewer

### Acceptance Criteria
- Artifacts display citations inline and in evidence panel
- Users can compare two builds and see semantic changes

---

## Milestone 4: Export + Audit (Weeks 9-10)

### Deliverables
- Export bundle (zip) containing:
  - Build report
  - Artifacts (json + formatted doc)
  - Citation list
  - Audit log
- Review-ready build status

### Acceptance Criteria
- Export bundle downloadable with correct contents
- Audit log includes user actions and compiler outputs

---

## Milestone 5: MCP Gateway + Skills (Weeks 11-12)

### Deliverables
- MCP gateway service with per-module policy
- Skills profile configuration
- Module access audit trail

### Acceptance Criteria
- Compiler modules can only call MCPs allowed by policy
- Disallowed calls return a policy error and are logged

---

## Definition of Done
- All MVP acceptance criteria met
- Docs cover setup, templates, and compiler usage
- Basic monitoring and error reporting enabled

