# WORKFLOW.md

# VXchatApp-PWA-Final Workflow

## Core Philosophy

AI + Human Intelligence

Build Once.

Publish Everywhere.

Reduce Friction.

Document Everything.

Understand repositories before writing code.

---

## Standard Workflow

Repository

↓

Audit

↓

Architecture

↓

Engineering Memory

↓

AI Collaboration

↓

Implementation

↓

Testing

↓

Deployment

↓

Repository Standard

---

## Daily Development Flow

1. Open repository in VS Code
2. Review README.md
3. Review docs/PROJECT_STATUS.md
4. Review docs/ROADMAP.md
5. Review docs/CONTINUE_PROJECT.md
6. Work only on the current implementation
7. Capture VLA artifact if milestone is visual
8. Push using tools/push.bat

---

## AI Collaboration Flow

Before implementation, AI must read:

1. README.md
2. docs/PROJECT_STATUS.md
3. docs/ROADMAP.md
4. docs/CONTINUE_PROJECT.md
5. docs/IMPLEMENTATION_001.md
6. docs/WORKFLOW.md
7. docs/VLA.md
8. docs/VLA_INDEX.md

AI must not write code before understanding the repository.

---

## Tooling Flow

tools/

- push.bat — commit and push
- organize_aers.ps1 — organize repository into AERS structure

Future tools:

- pull.bat
- audit.bat
- validate.bat
- repo_tree.bat
- release.bat
- backup.bat

---

## Commit Philosophy

Commits should describe engineering milestones.

Good:

- Add VLA-001 Repository Revival
- Add AERS organizer script
- Add Engineering Dashboard Foundation
- Add Repository Health Module

Avoid:

- update
- fix
- test
- final
- final final

---

## VLA Flow

Every major visual or structural milestone should create a VLA artifact.

Pattern:

```text
assets/images/VLA-001-Repository-Revival.png
assets/images/VLA-002-Push-Automation.png
assets/images/VLA-003-<Milestone-Name>.png
```

Rules:

- One VLA per milestone, numbered sequentially. Never reuse a number.
- Filename uses the milestone name in Title-Case-With-Hyphens, matching the commit message it belongs to.
- Every VLA gets an entry in docs/VLA_INDEX.md pointing to its file, its commit, and the implementation it belongs to.
- VLA.md holds the narrative context (why the milestone mattered); VLA_INDEX.md holds the lookup table (number, filename, date, implementation).
- A milestone without a visual artifact does not require a VLA. Structural-only changes are logged in CHANGELOG-style entries in PROJECT_STATUS.md instead.

---

## End-of-Session Checklist

Before closing a work session:

1. Update docs/PROJECT_STATUS.md with what shipped
2. Update docs/CONTINUE_PROJECT.md with current state and next step
3. Add a VLA artifact + index entry if the milestone was visual
4. Commit using the Commit Philosophy above
5. Push using tools/push.bat
