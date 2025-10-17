# GitHub Pages 部署指南

本项目已配置为可以部署到 GitHub Pages。有两种部署方式：

## 方式一：自动部署（推荐）

使用 GitHub Actions 自动部署，每次推送代码到 `main` 或 `develop` 分支时自动触发部署。

### 配置步骤：

1. **确保 GitHub Pages 设置正确**
   - 进入 GitHub 仓库设置：`Settings` > `Pages`
   - Source 选择：`GitHub Actions`

2. **推送代码**
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   git push origin develop
   ```

3. **查看部署状态**
   - 进入 GitHub 仓库的 `Actions` 标签页
   - 查看 "Deploy to GitHub Pages" workflow 的运行状态
   - 部署成功后，网站将在 https://jader-s.github.io 上可访问

## 方式二：手动部署

使用 `gh-pages` 包手动部署。

### 部署命令：

```bash
npm run deploy
```

这个命令会：
1. 自动运行 `npm run build` 构建项目
2. 将 `dist` 目录的内容推送到 `gh-pages` 分支
3. GitHub Pages 会自动从 `gh-pages` 分支部署网站

### 首次手动部署设置：

如果使用手动部署，需要确保：
- 在 GitHub 仓库设置中，`Settings` > `Pages` > Source 选择 `gh-pages` 分支

## 本地预览

在部署前，可以本地预览构建结果：

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 常见问题

### 1. 部署后页面显示 404

确保 GitHub Pages 设置中的 Source 配置正确：
- 自动部署：选择 `GitHub Actions`
- 手动部署：选择 `gh-pages` 分支

### 2. 样式或资源加载失败

检查 `vite.config.ts` 中的 `base` 配置：
- 如果仓库名是 `username.github.io`，`base` 应该是 `'/'`
- 如果仓库名是其他名称（如 `my-project`），`base` 应该是 `'/my-project/'`

### 3. GitHub Actions 部署失败

检查以下几点：
- 确保 `package.json` 和 `package-lock.json` 已提交
- 确保 `.github/workflows/deploy.yml` 文件已提交
- 在 GitHub 仓库的 Settings > Actions > General 中，确保 Workflow 权限设置为 "Read and write permissions"

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── src/                        # 源代码
├── public/                     # 静态资源
├── dist/                       # 构建输出（已被 .gitignore 忽略）
├── vite.config.ts             # Vite 配置文件
└── package.json               # 包含部署脚本
```

## 技术栈

- React 19
- TypeScript
- Vite 5
- React Router DOM 7
- GitHub Pages 部署

