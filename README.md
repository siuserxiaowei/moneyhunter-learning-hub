# MoneyHunter Learning Hub

<!-- SIUSER-REPO-GUIDE:START -->
## Repository Guide

### What This Repository Does

MoneyHunter 学习库：把公开资料整理成可搜索、可筛选、可复盘的 GitHub Pages 学习站。

English summary: MoneyHunter learning hub that turns public materials into a searchable, filterable GitHub Pages study site.

### Online Entry Points

- GitHub repository: https://github.com/siuserxiaowei/moneyhunter-learning-hub
- Live / GitHub Pages: https://siuserxiaowei.github.io/moneyhunter-learning-hub/
- Default branch: `main`
- Primary language: `Python`

### How To Read / Learn This Repository

1. 先读本 README，确认项目目标、在线入口和本地运行方式。
2. 打开上方 Live / GitHub Pages 链接，先从最终效果理解项目。
3. 按仓库目录从入口文件、数据文件、脚本和文档依次阅读。
4. 如果要修改内容，先小范围改动，再运行本 README 中的验证命令。

### Clone This Repository

```bash
git clone https://github.com/siuserxiaowei/moneyhunter-learning-hub.git
cd moneyhunter-learning-hub
```

### Run Or View Locally

```bash
python3 -m http.server 8000
```

然后打开 `http://127.0.0.1:8000/`。

### Repository Map

| Path | Purpose |
| --- | --- |
| `README.md` | 项目入口说明，先读这里。 |
| `index.html` | 静态站首页或页面入口。 |
| `docs/` | 文档或 GitHub Pages 输出目录。 |
| `data/` | 数据、索引或结构化内容。 |
| `scripts/` | 构建、同步、生成或维护脚本。 |
| `raw/` | 项目目录。 |
| `site/` | 项目目录。 |

### Maintenance Notes

- Keep this README in sync when the project purpose, live link, or run commands change.
- Prefer small, focused commits when changing code, data, or generated pages.
- Run the relevant build or validation command before publishing changes.
- If this is a generated/static archive, update the source data first, then regenerate the public files.

### Privacy And Safety

- Do not commit API keys, tokens, passwords, cookies, private URLs, or internal account data.
- Keep private source material out of public GitHub Pages output unless it has been explicitly cleared for publication.
- When in doubt, run a quick secret scan such as `rg -n "token|secret|password|access_key|authorization"` before pushing.
<!-- SIUSER-REPO-GUIDE:END -->

MoneyHunter 全量公开交互学习库。这个仓库把 MoneyHunter 本地资料夹整理成 GitHub Pages 可访问的静态站，保留原始资料、附件和外链，同时提供搜索、筛选、目录树、链接库和学习拆解文档。

## 在线入口

- 交互学习首页：<https://siuserxiaowei.github.io/moneyhunter-learning-hub/>
- 站点页面：<https://siuserxiaowei.github.io/moneyhunter-learning-hub/site/index.html>
- 公开链接库：<https://siuserxiaowei.github.io/moneyhunter-learning-hub/site/links.html>

## 当前数据

- 公开文件数：152
- Markdown 文件数：149
- Markdown 总行数：22463
- 附件数：3
- URL 出现次数：3545
- 唯一 URL 数：2178
- 生成时间：`2026-06-03T03:58:47+00:00`

## 目录

- [`raw/`](raw/)：MoneyHunter 原始资料镜像，保留目录结构。
- [`raw/index.html`](raw/index.html)：GitHub Pages 可打开的原始资料目录页。
- [`site/`](site/)：交互静态站。
- [`docs/`](docs/)：学习化拆解文档。
- [`data/`](data/)：manifest 和链接索引 JSON。
- [`scripts/`](scripts/)：导入与校验脚本。

## 复跑导入

```bash
python3 scripts/import_moneyhunter.py
python3 scripts/verify_package.py
```

## 公开边界

本仓库用于学习、复盘和资料查阅。普通资料、附件、二维码/图片、社群入口和外链按要求公开；`.git/`、`.DS_Store` 和明确凭据型密钥不公开。
