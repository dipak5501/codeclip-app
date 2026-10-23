# CodeClip

Local-first code snippet desk for developers. Create, tag, search, copy, and export snippets — data stays in your browser on **127.0.0.1**.

## Features

- Create / edit / delete snippets
- Tags + full-text search
- Language filter
- Copy to clipboard
- JSON import / export
- Seeded demo snippet on first load

## Setup

```bash
npm install
npm test
npm run build
npm start   # http://127.0.0.1:8787/
```

## Stop

Ctrl+C

## Privacy

No accounts. Persistence is `localStorage` only. Export is opt-in.

## License

MIT

## Self-adaptation

This app continuously learns from a **representative** public-web scan on the Mac Studio (not the entire internet).

**Latest:** Enhance CodeClip with Trend Signals

By incorporating public trend signals, the CodeSnip Clipper and Organizer can be improved to better meet user needs. This app can benefit from integrating AI-driven code categorization and search capabilities, as well as adding a feature for organizing snippets by project or context.

See `learning/LATEST.json` and `public/insights.json`.


