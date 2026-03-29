# Research Compiler - UI Wireframes (Text)

## 1) Workspace (Default IDE Layout)

+------------------------------------------------------------------------------------+
| Project: Cancer Biomarker Study     Template: Preclinical   Build: #12 (Failing)   |
+------------------------------------------------------------------------------------+
| PIPELINE (280px)        | ARTIFACT EDITOR (flex)             | BUILD & EVIDENCE     |
|-------------------------|-------------------------------------|----------------------|
| [Question]   Draft      | Hypotheses (Tab)  Protocol  Analysis| Build Status: FAIL   |
| [Hypotheses] Failing    |-------------------------------------| Version: #12          |
| [Literature] Compiled   | H1: ... [citation]                   | Timestamp: 10:42 AM   |
| [Methods]    Draft      | H2: ...                              |----------------------|
| [Analysis]   Not Started| Confidence: Medium                   | Tests                |
| [Risks]      Compiled   | [Inline validation messages]         | - Citation Coverage ?|
| [Compliance] Compiled   |                                     | - Ethics Check ?     |
| [Report]     Not Started| Build Console (collapsed)            | - Power Check ?      |
|                         | [Run Compile] [View Diff]            |----------------------|
| [New Build]             |                                     | Evidence             |
|                         |                                     | 1. Doe 2022 (RCT)     |
|                         |                                     | 2. Li 2021 (Review)   |
+------------------------------------------------------------------------------------+


## 2) Pipeline Stage Detail (Focused Editing)

+------------------------------------------------------------------------------------+
| Stage: Methods   Status: Draft     Build: #12 (Failing)        [Run Compile]        |
+------------------------------------------------------------------------------------+
| SECTION LIST                 | EDITOR                                             |
|-----------------------------|-----------------------------------------------------|
| 1. Experimental Design       | Protocol Title: _________________________________   |
| 2. Controls                  | Materials: [required]                              |
| 3. Reagents                  | - ______________________________________________   |
| 4. Steps                     | Steps:                                              |
| 5. QA / Replicates           | 1. ____________________________________________   |
|                             | 2. ____________________________________________   |
| Validation                   | [!] Missing controls section                        |
| - Protocol Completeness ?    | [Inline suggestions]                               |
+------------------------------------------------------------------------------------+


## 3) Build Diff Viewer

+------------------------------------------------------------------------------------+
| Compare Builds: #11 vs #12                 View: Split [x]  Unified [ ]             |
+------------------------------------------------------------------------------------+
| BUILD #11                               | BUILD #12                                |
|----------------------------------------|-------------------------------------------|
| Hypothesis H1 (Confidence: Low)        | Hypothesis H1 (Confidence: Medium)        |
| Evidence: Smith 2020                   | Evidence: Smith 2020, Doe 2022            |
|                                        | + Added new citation                       |
| Controls: Not specified                | Controls: Added negative control          |
+------------------------------------------------------------------------------------+


## 4) Evidence Panel (Expanded)

+-----------------------------------------+
| Evidence                                |
|-----------------------------------------|
| Doe, J. 2022. Title... (RCT)            |
| DOI: 10.xxxx/xxxxx                      |
| Source: PubMed                          |
| Linked Claims: H1, Protocol Step 3      |
|-----------------------------------------|
| Li, Y. 2021. Title... (Review)          |
| DOI: 10.xxxx/xxxxx                      |
| Source: arXiv                           |
| Linked Claims: H2                       |
+-----------------------------------------+


## 5) Build Report Export Screen

+------------------------------------------------------------------------------------+
| Build #12 Report Export                                                         [x]|
+------------------------------------------------------------------------------------+
| Include:  [x] Artifacts  [x] Citations  [x] Audit Log  [ ] Raw Data                |
| Format:   (x) PDF  ( ) Markdown  ( ) JSON Bundle                                  |
|                                                                                   |
| Summary: Build failed 2 tests                                                     |
| - Citation Coverage: 82% (needs 95%)                                              |
| - Power Check: insufficient sample size                                           |
|                                                                                   |
| [Download Export]                                                                 |
+------------------------------------------------------------------------------------+


## 6) Template Selection (New Project)

+------------------------------------------------------------------------------------+
| Create Project                                                                    |
+------------------------------------------------------------------------------------+
| Name: ______________________________                                              |
| Template:                                                                          |
| ( ) Basic Research                                                                 |
| ( ) Grant Proposal                                                                 |
| (x) Preclinical Study                                                              |
| ( ) Clinical Trial                                                                 |
|                                                                                   |
| [Create Project]                                                                   |
+------------------------------------------------------------------------------------+

