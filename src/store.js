const KEY = "codeclip.snippets.v1";

export function loadSnippets() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : seed();
  } catch {
    return seed();
  }
}

export function saveSnippets(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertSnippet(list, snippet) {
  const idx = list.findIndex((s) => s.id === snippet.id);
  if (idx >= 0) {
    const next = list.slice();
    next[idx] = { ...snippet, updatedAt: new Date().toISOString() };
    return next;
  }
  return [{ ...snippet, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, ...list];
}

export function removeSnippet(list, id) {
  return list.filter((s) => s.id !== id);
}

export function filterSnippets(list, { query = "", language = "" } = {}) {
  const q = query.trim().toLowerCase();
  return list.filter((s) => {
    if (language && (s.language || "").toLowerCase() !== language.toLowerCase()) return false;
    if (!q) return true;
    const hay = [s.title, s.language, s.code, ...(s.tags || [])].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

export function exportJson(list) {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), snippets: list }, null, 2);
}

export function importJson(text, existing) {
  const data = JSON.parse(text);
  const incoming = Array.isArray(data) ? data : data.snippets;
  if (!Array.isArray(incoming)) throw new Error("JSON must be an array or { snippets: [] }");
  const byId = new Map(existing.map((s) => [s.id, s]));
  for (const s of incoming) {
    if (!s || typeof s !== "object") continue;
    const id = s.id || crypto.randomUUID();
    byId.set(id, {
      id,
      title: String(s.title || "Untitled"),
      language: String(s.language || "text"),
      code: String(s.code || ""),
      tags: Array.isArray(s.tags) ? s.tags.map(String) : [],
      createdAt: s.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return [...byId.values()].sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

function seed() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Fetch JSON with timeout",
      language: "javascript",
      tags: ["fetch", "timeout"],
      code: `async function fetchJson(url, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
