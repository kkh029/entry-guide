// dev-docs/assets/doc.js — 공통 동작 (TOC / anchor / copy / Mermaid / scroll-sync).
// 변경 시 영향: dev-docs/*.html 전체.

(function () {
  "use strict";
  const slugify = (t) => t.toLowerCase().trim()
    .replace(/[^\w\s가-힣-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  function buildToc() {
    const main = document.querySelector("main");
    const toc = document.querySelector("aside#toc");
    if (!main || !toc) return;
    const headings = main.querySelectorAll("h2, h3");
    if (!headings.length) { toc.style.display = "none"; return; }
    const used = new Set(); const list = document.createElement("ul");
    headings.forEach((h) => {
      if (!h.id) {
        let base = slugify(h.textContent || "section"), id = base, n = 2;
        while (used.has(id) || document.getElementById(id)) id = `${base}-${n++}`;
        h.id = id;
      }
      used.add(h.id);
      if (!h.querySelector(".heading-anchor")) {
        const a = document.createElement("a");
        a.href = `#${h.id}`; a.className = "heading-anchor";
        a.setAttribute("aria-label", "이 섹션 링크"); a.textContent = "#";
        h.appendChild(a);
      }
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${h.id}`;
      link.textContent = h.textContent.replace(/#$/, "").trim();
      if (h.tagName === "H3") li.className = "toc-h3";
      li.appendChild(link); list.appendChild(li);
    });
    const title = document.createElement("h2"); title.textContent = "목차";
    toc.appendChild(title); toc.appendChild(list);
  }

  function attachCopyButtons() {
    document.querySelectorAll("main pre").forEach((pre) => {
      if (pre.classList.contains("mermaid")) return;
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn"; btn.type = "button"; btn.textContent = "복사";
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        try {
          await navigator.clipboard.writeText((code || pre).innerText);
          btn.textContent = "복사됨"; btn.classList.add("copied");
          setTimeout(() => { btn.textContent = "복사"; btn.classList.remove("copied"); }, 1500);
        } catch (e) {
          btn.textContent = "실패";
          setTimeout(() => (btn.textContent = "복사"), 1500);
        }
      });
      pre.appendChild(btn);
    });
  }

  function initMermaid() {
    const blocks = document.querySelectorAll(".mermaid");
    if (!blocks.length) return;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    s.onload = () => {
      window.mermaid.initialize({
        startOnLoad: true, theme: dark ? "dark" : "default",
        securityLevel: "loose", fontFamily: "inherit",
      });
    };
    document.head.appendChild(s);
  }

  function syncTocOnScroll() {
    const tocLinks = document.querySelectorAll("aside#toc a");
    if (!tocLinks.length) return;
    const map = new Map();
    tocLinks.forEach((a) => {
      const id = a.getAttribute("href")?.slice(1);
      if (id) map.set(id, a);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const link = map.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-10% 0px -75% 0px", threshold: 0 });
    document.querySelectorAll("main h2, main h3").forEach((h) => {
      if (h.id) obs.observe(h);
    });
  }

  const ready = (fn) => document.readyState !== "loading"
    ? fn() : document.addEventListener("DOMContentLoaded", fn);
  ready(() => { buildToc(); attachCopyButtons(); initMermaid(); syncTocOnScroll(); });
})();
