# MoneyHunter Learning Hub

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
