# Research Compiler - UI Design Language Spec

## 1. Visual Direction
- Intent: professional, research-grade, structured, and calm.
- Feel: IDE + lab notebook, not chat.
- Theme: light by default with high-contrast status colors.

## 2. Typography
- Headings: "Source Serif 4" (or "Merriweather" fallback).
- Body/UI: "IBM Plex Sans" (or "Source Sans 3" fallback).
- Monospace: "IBM Plex Mono" for artifacts, diffs, and logs.

## 3. Color System
Define CSS variables with clear semantic meaning.

- --bg: #F7F8FA
- --panel: #FFFFFF
- --panel-alt: #F1F3F6
- --text: #1E2430
- --muted: #5A6474
- --border: #D8DDE6

Status colors:
- --success: #1F7A4D
- --warning: #B16A00
- --danger: #B0382C
- --info: #2F5DAA
- --accent: #3A6EA5

Build states:
- Passing: success
- Failing: danger
- Draft: info
- Not Started: muted

## 4. Layout Principles
- Three-panel IDE layout is the default.
- Left panel: pipeline navigator, fixed width 280px.
- Center panel: artifact editor, fluid.
- Right panel: build/evidence, fixed width 320px.
- Top utility bar with project name, template, and build controls.

## 5. Components

### Pipeline Stage Card
- Title, status badge, last updated time.
- Click changes stage; unsaved edits prompt confirmation.

### Artifact Editor
- Structured sections with required field markers.
- Inline validation with colored left rule and message.
- Citation anchors inline and in margins.

### Build Console
- Monospace, collapsible log lines.
- Icons for pass/fail/skipped.

### Test Checklist
- Grouped by severity.
- Each test shows failure detail and remediation link.

### Evidence Panel
- Source list with evidence grade tag.
- Hover reveals metadata (DOI, authors, year).

### Diff Viewer
- Split or unified view.
- Highlight semantic changes (section headings, variables).

## 6. Motion and Feedback
- Subtle fade-in on build completion.
- Stage switching uses 150ms ease-in.
- Progress bar for compilation phases.

## 7. Accessibility
- WCAG AA contrast for text and status colors.
- Keyboard navigation across panels.
- Visible focus states and ARIA labels.

## 8. Dark Theme (Optional)
- Not default.
- Must preserve status color clarity.

