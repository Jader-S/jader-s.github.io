# Jader's GitHub Pages

这是一个使用 React + TypeScript + Vite 构建的个人网站项目。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

访问 http://localhost:5173 查看开发版本。

### 构建

```bash
npm run build
```

构建产物会输出到 `dist` 目录。

### 预览

```bash
npm run preview
```

预览构建后的项目。

## 📦 部署

### 自动部署（推荐）

推送代码到 `main` 或 `develop` 分支，GitHub Actions 会自动构建和部署。

```bash
git push origin develop
```

### 手动部署

```bash
npm run deploy
```

详细的部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 🛠️ 技术栈

- **框架**: React 19
- **语言**: TypeScript
- **构建工具**: Vite 5
- **路由**: React Router DOM 7
- **部署**: GitHub Pages

## 📁 项目结构

```
src/
├── components/       # 可复用组件
├── pages/           # 页面组件
├── assets/          # 静态资源
├── styles/          # 全局样式
└── utils/           # 工具函数
```

## 📄 许可证

MIT

