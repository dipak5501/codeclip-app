import "./style.css";
import {
  loadSnippets,
  saveSnippets,
  upsertSnippet,
  removeSnippet,
  filterSnippets,
  exportJson,
  importJson,
} from "./store.js";

const root = document.querySelector("#app");
let snippets = loadSnippets();
let selectedId = snippets[0]?.id || null;
let query = "";
let language = "";

function selected() {
  return snippets.find((s) => s.id === selectedId) || null;
}

function languages() {
  return [...new Set(snippets.map((s) => s.language).filter(Boolean))].sort();
}

function render() {
  const list = filterSnippets(snippets, { query, language });
  const current = selected();
  root.innerHTML = `
    <div class="shell">
      <header class="top">
        <div>
          <h1>CodeClip</h1>
          <p class="lede">Local-only snippet desk. Nothing leaves this browser unless you export.</p>
        </div>
        <div class="actions">
          <button type="button" id="new">New snippet</button>
          <button type="button" class="ghost" id="export">Export JSON</button>
          <label class="ghost file">Import<input type="file" id="import" accept="application/json,.json" hidden /></label>
        </div>
      </header>
      <div class="layout">
        <aside class="side">
          <input id="q" placeholder="Search title, tags, code…" value="${escapeAttr(query)}" />
          <select id="lang">
            <option value="">All languages</option>
            ${languages().map((l) => `<option value="${escapeAttr(l)}" ${l === language ? "selected" : ""}>${escapeHtml(l)}</option>`).join("")}
          </select>
          <ul class="list">
            ${list
              .map(
                (s) => `<li class="${s.id === selectedId ? "active" : ""}" data-id="${s.id}">
              <strong>${escapeHtml(s.title)}</strong>
              <span>${escapeHtml(s.language)}${s.tags?.length ? " · " + escapeHtml(s.tags.join(", ")) : ""}</span>
            </li>`,
              )
              .join("") || "<li class='empty'>No snippets match.</li>"}
          </ul>
        </aside>
        <section class="editor">
          ${
            current
              ? `
            <div class="row">
              <input id="title" value="${escapeAttr(current.title)}" placeholder="Title" />
              <input id="language" value="${escapeAttr(current.language)}" placeholder="language" />
            </div>
            <input id="tags" value="${escapeAttr((current.tags || []).join(", "))}" placeholder="tags, comma, separated" />
            <textarea id="code" spellcheck="false" placeholder="Paste code">${escapeHtml(current.code)}</textarea>
            <div class="row">
              <button type="button" id="save">Save</button>
              <button type="button" class="ghost" id="copy">Copy code</button>
              <button type="button" class="danger" id="del">Delete</button>
              <span id="msg" class="msg"></span>
            </div>`
              : "<p class='empty'>Create a snippet to begin.</p>"
          }
        </section>
      </div>
      <p class="foot">Bound to 127.0.0.1 · data in localStorage · MIT</p>
    </div>
  `;

  root.querySelector("#q")?.addEventListener("input", (e) => {
    query = e.target.value;
    render();
    root.querySelector("#q")?.focus();
    const el = root.querySelector("#q");
    if (el) el.selectionStart = el.selectionEnd = el.value.length;
  });
  root.querySelector("#lang")?.addEventListener("change", (e) => {
    language = e.target.value;
    render();
  });
  root.querySelectorAll(".list li[data-id]").forEach((li) => {
    li.addEventListener("click", () => {
      selectedId = li.dataset.id;
      render();
    });
  });
  root.querySelector("#new")?.addEventListener("click", () => {
    const s = {
      id: crypto.randomUUID(),
      title: "Untitled snippet",
      language: "javascript",
      tags: [],
      code: "",
    };
    snippets = upsertSnippet(snippets, s);
    saveSnippets(snippets);
    selectedId = s.id;
    render();
  });
  root.querySelector("#save")?.addEventListener("click", () => {
    if (!current) return;
    const title = root.querySelector("#title").value.trim() || "Untitled";
    const dup = snippets.find((s) => s.id !== current.id && s.title.toLowerCase() === title.toLowerCase());
    const next = {
      ...current,
      title,
      language: root.querySelector("#language").value.trim() || "text",
      tags: root
        .querySelector("#tags")
        .value.split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      code: root.querySelector("#code").value,
    };
    snippets = upsertSnippet(snippets, next);
    saveSnippets(snippets);
    const msg = root.querySelector("#msg");
    msg.textContent = dup ? "Saved (warning: duplicate title exists)." : "Saved.";
    render();
  });
  root.querySelector("#copy")?.addEventListener("click", async () => {
    if (!current) return;
    await navigator.clipboard.writeText(root.querySelector("#code").value);
    root.querySelector("#msg").textContent = "Copied.";
  });
  root.querySelector("#del")?.addEventListener("click", () => {
    if (!current) return;
    if (!confirm("Delete this snippet?")) return;
    snippets = removeSnippet(snippets, current.id);
    saveSnippets(snippets);
    selectedId = snippets[0]?.id || null;
    render();
  });
  root.querySelector("#export")?.addEventListener("click", () => {
    const blob = new Blob([exportJson(snippets)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "codeclip-export.json";
    a.click();
  });
  root.querySelector("#import")?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      snippets = importJson(await file.text(), snippets);
      saveSnippets(snippets);
      selectedId = snippets[0]?.id || null;
      render();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/\n/g, " ");
}

render();
