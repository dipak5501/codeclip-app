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

**Latest:** Enhance CodeClip with Public Trend Insights

Integrate real-time code snippet categorization and user feedback mechanisms to improve the organization and sharing experience. Implement a GPU-accelerated image processing feature for faster preview generation, and introduce a taxonomy system for better searchability.

See `learning/LATEST.json` and `public/insights.json`.


