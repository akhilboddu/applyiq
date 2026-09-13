# ApplyIQ Slide Decks — How to Use

## Quick Start

```bash
cd ~/Documents/ZAIO/Course/slides
npm install          # first time only
npm run dev:intro    # opens intro slides in browser
```

## Present a Module

Each module is a separate slide deck. Run one at a time:

```bash
npm run dev:intro    # Course introduction (16 slides)
npm run dev:m1       # Module 1: Product Thinking & Setup (35 slides)
npm run dev:m2       # Module 2: Backend API (41 videos, 86 slides)
npm run dev:m3       # Module 3: React Frontend (27 videos, 57 slides)
npm run dev:m4       # Module 4: Web APIs & AI (7 videos, 24 slides)
npm run dev:m5       # Module 5: Testing (7 videos, 32 slides)
npm run dev:m6       # Module 6: Performance & Real-Time (6 videos, 22 slides)
npm run dev:m7       # Module 7: Deployment (5 videos, 16 slides)

# Modules 2–7 are now structured ONE PA CODE = ONE VIDEO (93 videos total).
# Each video divider carries its 🎥 VIDEO NAME in the speaker notes.
# See VIDEO-NAMES.md for the full copy-paste naming cheatsheet.
```

Opens at `http://localhost:3030`. Kill with `Ctrl+C` before starting another.

## Keyboard Controls (while presenting)

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `o` | Overview (grid of all slides) |
| `d` | Toggle dark mode |
| `f` | Fullscreen |
| `Escape` | Exit fullscreen / overview |

## Presenter Mode

Go to `http://localhost:3030/presenter/` in a second browser window. Shows:
- Current slide
- Next slide preview
- Speaker notes (if added)
- Timer

Use this on your laptop screen while the audience sees the main window.

## Export to PDF

```bash
npm run export:m1       # exports Module 1 to exports/module-1.pdf
npm run export:all      # exports all modules to PDF
```

Requires `playwright` — install with `npx playwright install chromium` if export fails.

## File Structure

```
slides/
  intro.md              # Course introduction deck
  module-1.md           # Module 1 slides (Slidev markdown)
  module-2.md           # Module 2 slides
  module-3.md           # ...
  module-4.md
  module-5.md
  module-6.md
  module-7.md
  styles/
    zaio.css            # Zaio dark theme (all decks share this)
  public/
    avatar.png          # Akhil's avatar (used on title slides)
  package.json          # npm scripts
```

## How Slides Work

These use [Slidev](https://sli.dev) — a markdown-to-slides tool. Each `.md` file IS the slide deck. Edit the markdown, slides update live in the browser (hot reload).

Slides are separated by `---` on its own line. The first block is global config:

```yaml
---
theme: default
title: "ApplyIQ — Module 1"
---
```

## Editing Slides

Just edit the `.md` files. Changes appear instantly in the browser.

To add a new slide, add `---` and write markdown below it. Code blocks, tables, HTML, and images all work.

## Source Content Files

The slide content was generated from these source specs (in `~/Documents/ZAIO/Course Creation/`):

| File | Modules |
|------|---------|
| `applyiq_slide_content.md` | Module 1 |
| `applyiq_m2_slide_content.md` | Module 2 |
| `applyiq_m3_slide_content.md` | Module 3 |
| `applyiq_m4_slide_content.md` | Module 4 |
| `applyiq_m567_slide_content.md` | Modules 5, 6, 7 |
| `qcto_compliance_matrix.md` | PA code mapping reference |

## Diagrams

Excalidraw diagrams are in `~/Documents/ZAIO/Course Creation/diagrams/`:

| Diagram | Used In |
|---------|---------|
| `course-roadmap.excalidraw` | Intro |
| `tech-stack-architecture.excalidraw` | Intro |
| `mvc-bridge.excalidraw` | Module 1 |
| `csrf-attack-flow.excalidraw` | Module 2 |
| `auth-approaches.excalidraw` | Module 2 |
| `build-tools-evolution.excalidraw` | Module 3 |
| `repository-pattern.excalidraw` | Module 5 |
| `stateless-vs-stateful.excalidraw` | Module 6 |

Open `.excalidraw` files in Obsidian (Excalidraw plugin) or at excalidraw.com to edit.

## QCTO Alignment

Every slide maps to QCTO PM-09 checkpoints (SAQA 118707, NQF Level 5). The compliance matrix at `qcto_compliance_matrix.md` shows which PA code maps to which module/video/slide. 101/101 checkpoints covered.
