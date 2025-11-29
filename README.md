## ValintFoods Website

This is a personal / company website project built with **React + TypeScript + Vite** and deployed as a static site.

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

The build output will be generated in the `dist` directory.

### Preview production build

```bash
npm run preview
```

This runs a local server to preview the built site from `dist`.

---

## 📦 Deployment

This project is designed to be deployed to a **static hosting environment**, such as your WordPress webspace or any other web server that can serve static files.

### Example: custom server deployment

1. Build locally:

   ```bash
   npm run build
   ```

2. Upload everything from `dist` to your server (example using `scp`):

   ```bash
   scp -r dist/* a1478919@access-5018136900.webspace-host.com:~/wordpress/
   ```

Make sure the server’s document root (or a subdirectory) is pointing to `~/wordpress/` so `index.html` is served correctly.

---

## 🛠 Tech Stack

- **Framework**: React 19  
- **Language**: TypeScript  
- **Build Tool**: Vite 5  
- **Router**: React Router DOM 7  
- **Maps**: Leaflet + React Leaflet  

---

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── assets/           # Static assets (images, fonts)
├── styles/           # Global and layout styles
└── utils/            # Utility functions and helpers
```

Key entry points:

- `src/main.tsx` – React entry, mounts the app and configures routing  
- `src/App.tsx` – Application shell (header, main layout, routed content)

---

## 📄 License

MIT


