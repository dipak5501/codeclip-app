import test from "node:test";
import assert from "node:assert/strict";

function filterSnippets(list, { query = "", language = "" } = {}) {
  const q = query.trim().toLowerCase();
  return list.filter((s) => {
    if (language && (s.language || "").toLowerCase() !== language.toLowerCase()) return false;
    if (!q) return true;
    const hay = [s.title, s.language, s.code, ...(s.tags || [])].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

function importJson(text, existing) {
  const data = JSON.parse(text);
  const incoming = Array.isArray(data) ? data : data.snippets;
  const byId = new Map(existing.map((s) => [s.id, s]));
  for (const s of incoming) byId.set(s.id, s);
  return [...byId.values()];
}

test("filter by query and language", () => {
  const list = [
    { id: "1", title: "Fetch helper", language: "javascript", code: "fetch()", tags: ["net"] },
    { id: "2", title: "SQL select", language: "sql", code: "select 1", tags: [] },
  ];
  assert.equal(filterSnippets(list, { query: "fetch" }).length, 1);
  assert.equal(filterSnippets(list, { language: "sql" })[0].id, "2");
});

test("import merges by id", () => {
  const a = importJson(JSON.stringify({ snippets: [{ id: "1", title: "A", language: "js", code: "1", tags: [] }] }), []);
  assert.equal(a.length, 1);
});
