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

**Latest:** Enhancing CodeClip with Public Trend Signals

By integrating features from Minireel/HGhub and janestreet/agent_skills, codeclip can improve user experience through enhanced snippet categorization and automation. GestaltX’s visual analytics could offer insights into coding trends, while KKKKhazix/agent-autoloop’s AI capabilities can automate repetitive tasks.

See `learning/LATEST.json` and `public/insights.json`.


