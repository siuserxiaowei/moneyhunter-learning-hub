
"use strict";

const data = window.moneyHunterContent;
const stats = data.stats;
const files = data.files;
const uniqueLinks = data.uniqueLinks;
const attachments = data.attachments;
const rootPrefix = document.body.dataset.rootPrefix || "";

const page = document.body.dataset.page || "home";
const searchInput = document.querySelector("#searchInput");
const yearFilter = document.querySelector("#yearFilter");
const tagFilter = document.querySelector("#tagFilter");
const riskFilter = document.querySelector("#riskFilter");
const fileResults = document.querySelector("#fileResults");
const resultCount = document.querySelector("#resultCount");
const directoryTree = document.querySelector("#directoryTree");
const treeCount = document.querySelector("#treeCount");
const fileDetail = document.querySelector("#fileDetail");
const attachmentGrid = document.querySelector("#attachmentGrid");
const attachmentCount = document.querySelector("#attachmentCount");
const domainGrid = document.querySelector("#domainGrid");
const linkSearchInput = document.querySelector("#linkSearchInput");
const linkTableBody = document.querySelector("#linkTableBody");
const linkCount = document.querySelector("#linkCount");

let activePath = "";

function byId(id) {
  return document.querySelector(id);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statCards() {
  const target = byId("#stats");
  if (!target) return;
  const items = [
    ["公开文件", stats.fileCount],
    ["Markdown", stats.markdownCount],
    ["总行数", stats.markdownTotalLines],
    ["附件", stats.attachmentCount],
    ["URL 出现", stats.linkOccurrenceCount],
    ["唯一链接", stats.uniqueLinkCount]
  ];
  target.innerHTML = items.map(([label, value]) => `<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
}

function fillSelect(select, options, allLabel) {
  if (!select) return;
  select.innerHTML = [`<option value="">${allLabel}</option>`].concat(
    options.map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
  ).join("");
}

function initFilters() {
  fillSelect(yearFilter, Object.keys(stats.yearCounts), "全部年份");
  fillSelect(tagFilter, Object.keys(stats.tagCounts), "全部主题");
  const risks = Array.from(new Set(files.flatMap(file => file.riskTags))).sort();
  fillSelect(riskFilter, risks, "全部风险标签");
}

function fileMatches(file) {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const year = yearFilter?.value || "";
  const tag = tagFilter?.value || "";
  const risk = riskFilter?.value || "";
  const pathMatch = !activePath || file.path === activePath || file.path.startsWith(activePath + "/");
  const yearMatch = !year || file.year === year;
  const tagMatch = !tag || file.tags.includes(tag);
  const riskMatch = !risk || file.riskTags.includes(risk);
  const haystack = [
    file.path, file.title, file.excerpt, file.content,
    file.tags.join(" "), file.riskTags.join(" "), file.headings.join(" ")
  ].join(" ").toLowerCase();
  const queryMatch = !query || haystack.includes(query);
  return pathMatch && yearMatch && tagMatch && riskMatch && queryMatch;
}

function pillList(items, risk = false) {
  return (items || []).map(item => `<span class="pill${risk ? " risk" : ""}">${escapeHtml(item)}</span>`).join("");
}

function fileCard(file) {
  const risk = file.riskTags.length ? `<div class="meta-row">${pillList(file.riskTags, true)}</div>` : "";
  return `<article class="file-card" data-path="${escapeHtml(file.path)}">
    <h3>${escapeHtml(file.title)}</h3>
    <p class="muted">${escapeHtml(file.path)}</p>
    <div class="meta-row">${pillList(file.tags)}<span class="pill">${escapeHtml(file.year)}</span><span class="pill">${escapeHtml(file.extension || "file")}</span></div>
    ${risk}
    <p>${escapeHtml(file.excerpt || "附件或空文件，打开原始文件查看。")}</p>
  </article>`;
}

function renderFiles() {
  if (!fileResults) return;
  const visible = files.filter(fileMatches);
  fileResults.innerHTML = visible.slice(0, 240).map(fileCard).join("");
  resultCount.textContent = `显示 ${visible.length} / ${files.length} 个文件`;
  fileResults.querySelectorAll(".file-card").forEach(card => {
    card.addEventListener("click", () => {
      const file = files.find(item => item.path === card.dataset.path);
      if (file) renderDetail(file);
    });
  });
}

function renderTree() {
  if (!directoryTree) return;
  const paths = Array.from(new Set(files.flatMap(file => {
    const parts = file.path.split("/");
    const acc = [];
    for (let i = 1; i <= parts.length; i += 1) acc.push(parts.slice(0, i).join("/"));
    return acc;
  }))).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
  treeCount.textContent = `${paths.length} 个节点`;
  const buttons = [`<button type="button" data-path="" class="${!activePath ? "is-active" : ""}">全部文件</button>`].concat(
    paths.map(path => {
      const depth = path.split("/").length - 1;
      const label = `${"&nbsp;".repeat(depth * 3)}${escapeHtml(path.split("/").at(-1))}`;
      return `<button type="button" data-path="${escapeHtml(path)}" class="${path === activePath ? "is-active" : ""}">${label}</button>`;
    })
  );
  directoryTree.innerHTML = buttons.join("");
  directoryTree.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activePath = button.dataset.path || "";
      renderTree();
      renderFiles();
    });
  });
}

function renderDetail(file) {
  if (!fileDetail) return;
  const sourceLinks = data.links
    .filter(link => link.sourcePath === file.path)
    .slice(0, 40)
    .map(link => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.url)}</a></li>`)
    .join("");
  const content = file.content ? `<pre>${escapeHtml(file.content)}</pre>` : `<p class="muted">这是附件或空文件，请使用原始文件入口查看。</p>`;
  fileDetail.hidden = false;
  fileDetail.innerHTML = `<div class="panel-head"><h2>${escapeHtml(file.title)}</h2><span>${escapeHtml(file.path)}</span></div>
    <div class="meta-row">${pillList(file.tags)}${pillList(file.riskTags, true)}<span class="pill">${escapeHtml(file.year)}</span></div>
    <div class="detail-actions">
      <a class="button primary" href="${rootPrefix}${escapeHtml(file.publicPath)}" target="_blank" rel="noreferrer">打开原始文件</a>
      <a class="button secondary" href="https://github.com/siuserxiaowei/moneyhunter-learning-hub/blob/main/${escapeHtml(file.publicPath)}" target="_blank" rel="noreferrer">GitHub 查看</a>
    </div>
    ${content}
    ${sourceLinks ? `<h3>本文外链</h3><ul>${sourceLinks}</ul>` : ""}`;
  fileDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderAttachments() {
  if (!attachmentGrid) return;
  attachmentCount.textContent = `${attachments.length} 个附件`;
  attachmentGrid.innerHTML = attachments.map(file => {
    const detail = file.attachment?.kind === "pptx"
      ? `${file.attachment.slides.length} 页幻灯片，${file.attachment.mediaCount || 0} 个媒体`
      : file.attachment?.kind === "xlsx"
        ? `${file.attachment.sheets?.[0]?.rows || 0} 行，${file.attachment.sheets?.[0]?.columns || 0} 列`
        : "图片附件";
    return `<article class="attachment-card">
      <h3>${escapeHtml(file.title)}</h3>
      <p class="muted">${escapeHtml(file.path)}</p>
      <p>${escapeHtml(detail)}</p>
      <div class="detail-actions"><a class="text-link" href="${rootPrefix}${escapeHtml(file.publicPath)}" target="_blank" rel="noreferrer">打开/下载</a></div>
    </article>`;
  }).join("");
}

function renderDomains() {
  if (!domainGrid) return;
  domainGrid.innerHTML = stats.topDomains.slice(0, 18).map(item =>
    `<article class="domain-card"><strong>${escapeHtml(item.domain)}</strong><span>${item.count} 次出现</span></article>`
  ).join("");
}

function linkMatches(link) {
  const query = (linkSearchInput?.value || "").trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    link.url, link.domain, link.group, link.tags.join(" "), link.riskTags.join(" "),
    link.sources.map(source => source.path + " " + source.title).join(" ")
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function renderLinks() {
  if (!linkTableBody) return;
  const visible = uniqueLinks.filter(linkMatches);
  linkCount.textContent = `显示 ${visible.length} / ${uniqueLinks.length} 个唯一链接`;
  linkTableBody.innerHTML = visible.slice(0, 1000).map(link => {
    const first = link.sources[0];
    return `<tr>
      <td class="link-url"><a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.url)}</a></td>
      <td>${escapeHtml(link.domain)}</td>
      <td>${escapeHtml(link.group)}</td>
      <td>${link.count}</td>
      <td><a class="text-link" href="${rootPrefix}${escapeHtml(first.publicPath)}" target="_blank" rel="noreferrer">${escapeHtml(first.path)}</a></td>
      <td>${pillList(link.tags)}${pillList(link.riskTags, true)}</td>
    </tr>`;
  }).join("");
}

function wireEvents() {
  [searchInput, yearFilter, tagFilter, riskFilter].forEach(control => {
    control?.addEventListener("input", renderFiles);
    control?.addEventListener("change", renderFiles);
  });
  linkSearchInput?.addEventListener("input", renderLinks);
}

statCards();
initFilters();
renderTree();
renderFiles();
renderAttachments();
renderDomains();
renderLinks();
wireEvents();
