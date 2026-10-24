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

**Latest:** Enhance CodeClip with AI-Powered Snippet Suggestions

Integrate machine learning models to automatically categorize and suggest relevant code snippets based on user input, improving search efficiency. Implement a chatbot feature using natural language processing (NLP) for users to ask questions about coding issues directly within the app. Add real-time collaboration features allowing multiple developers to work together on projects in real time.

See `learning/LATEST.json` and `public/insights.json`.


