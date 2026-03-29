# Skills + MCP Policy Schema (Draft)

## Purpose
Define a declarative policy that controls which compiler modules can access which MCP servers and what actions they can perform.

## Files
- `skills_profiles.yaml` (module capabilities and limits)
- `mcp_policy.yaml` (permissions mapping)

---

## skills_profiles.yaml (example)

```
modules:
  literature_compiler:
    capabilities:
      - search
      - summarize
      - cite
    output_formats:
      - structured_json
      - tables
    hard_limits:
      - no_medical_advice
      - no_market_analysis
    confidence_thresholds:
      min_evidence_grade: review

  methods_compiler:
    capabilities:
      - design_protocol
      - validate_controls
    output_formats:
      - structured_json
      - checklist
    hard_limits:
      - no_clinical_guidance

  analysis_compiler:
    capabilities:
      - compute
      - stats_design
    output_formats:
      - structured_json
      - code
    hard_limits:
      - no_wet_lab_protocols
    allow_code_execution: true
```

---

## mcp_policy.yaml (example)

```
policies:
  default:
    read:
      - project-state
      - citations
    write: []

  literature_compiler:
    read:
      - pubmed
      - arxiv
      - crossref
      - citations
    write:
      - citations

  methods_compiler:
    read:
      - protocols
      - reagents
      - lab-equipment
    write: []

  analysis_compiler:
    read:
      - data-lake
      - stats-tooling
    write:
      - stats-tooling

  compliance_compiler:
    read:
      - fda
      - ema
      - guidance
    write: []
```

---

## Runtime Enforcement Rules
1. Each compiler module is issued a short-lived MCP token.
2. The token encodes module name + policy version.
3. Requests to MCPs are validated against `mcp_policy.yaml`.
4. Denied requests return `POLICY_DENIED` with reason.
5. All MCP calls are logged with module, MCP, action, and result.

---

## Audit Log Fields
- timestamp
- project_id
- build_id
- module
- mcp_name
- action (read/write)
- outcome (allowed/denied)
- reason (if denied)

---

## Notes
- Policies can be overridden per workspace.
- Write access is opt-in only.
- All policy changes require an audit entry.

