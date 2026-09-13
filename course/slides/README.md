# ApplyIQ course slides

The course introduction and Modules 1–7, written in [Slidev](https://sli.dev/) Markdown, with their styles, avatar and diagrams.

## Present locally

```bash
cd course/slides
npm ci
npm run dev:intro
```

Use `npm run dev:m1` through `npm run dev:m7` to present a module. The CLI prints the local URL. Presenter mode is available by adding `/presenter/` to that URL.

See [INSTRUCTIONS.md](INSTRUCTIONS.md) for the existing presentation guide and [VIDEO-NAMES.md](VIDEO-NAMES.md) for the recording-name reference. The deck files are the current content; older guide counts may lag slide edits.

## Build a deck

```bash
npx slidev build intro.md --out dist/intro
npx slidev build module-7.md --out dist/module-7
```

This folder contains presentation sources and assets. Recordings are hosted separately on Loom; this repository does not contain the videos or publish private Loom links. Local backups, editor files, generated builds and instructor recording-state notes are excluded.

A hardcoded development-token example in Module 4 uses an explicit placeholder in this published copy. Supply your own local test credentials when following the exercises; never commit credentials.
