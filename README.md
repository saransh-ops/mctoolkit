<div align="center">

<img src="pfp.png" width="64" alt="MC Toolkit Logo">

# MC Toolkit

**The only toolbox a Minecraft server admin will ever need.**

[![Status](https://img.shields.io/badge/status-live-4ade80?style=flat-square)](https://mc-toolkit.vercel.app)
[![Built With](https://img.shields.io/badge/built%20with-HTML%20%2F%20CSS%20%2F%20JS-60a5fa?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-a78bfa?style=flat-square)](#license)

A blazing-fast, zero-install, 100% client-side toolkit for Minecraft server administrators.  
No account required. No backend. Just open it and go.

[**Open the Toolkit →**](https://mc-toolkit.vercel.app)

</div>

---

## ✨ Tools

| Tool | Description |
|------|-------------|
| 🟢 **Server Pinger** | Ping any Java or Bedrock server — live status, MOTD (with colors), player list, version, protocol |
| 🧑 **Player Lookup** | 3D animated skin viewer, cape detection, UUID & short UUID, recent search history |
| 📋 **Crash Log Analyser** | Paste a `latest.log` or crash report — detect errors, warnings, and get instant fix suggestions |
| ⚡ **Performance Analyser** | Calculate ideal TPS, MSPT, view distance, and entity limits for your server hardware |
| 🎨 **MOTD Builder** | Design server MOTDs with live Minecraft color/format code preview and copy-ready output |
| 🌈 **Gradient Generator** | Generate RGB gradient text for server names, MOTDs, and plugins |
| ⚙️ **JVM Flags Generator** | Generate Aikar's optimized GC flags for Java 11 / 17 / 21 — tailored to your RAM |
| 📄 **server.properties Generator** | Interactive editor for all server.properties settings with descriptions and defaults |
| 🏳️ **Banner Designer** | Layer-by-layer visual banner designer with live SVG preview and `/give` commands for 1.20 & 1.21+ |

---

## 🚀 Quick Start

No build step needed. Open `index.html` directly in your browser — or serve locally for full CORS support:

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
mc-toolkit/
│
├── index.html            # Homepage — tool cards & feature cycler
├── ping.html             # Server Pinger
├── player.html           # Player Lookup with 3D skin viewer
├── log.html              # Crash Log Analyser
├── perf.html             # Performance Analyser
├── motd.html             # MOTD Builder
├── gradient.html         # Gradient Generator
├── jvm.html              # JVM Flags Generator
├── props.html            # server.properties Generator
├── banner.html           # Banner Designer
│
├── assets/
│   ├── style.css         # Global design system (tokens, cards, animations)
│   ├── shared.js         # Theme engine, Firebase sync, toast utility
│   ├── nav.html          # Injected navigation bar (shared across all pages)
│   ├── background2.jpg   # Animated background image
│   ├── skinview3d.bundle.js  # 3D skin renderer
│   └── icons/            # Minecraft-style PNG icons
│
└── vercel.json           # Vercel clean URL routing config
```

---

## 🎨 Design System

The entire UI is powered by a shared **CSS custom property design token system** in [`assets/style.css`](assets/style.css).

- **Dark glassmorphism** UI with animated blurred background
- **Accent theming** — accent color, borders, and glows all use a single `--accent` variable
- **Staggered page-load animations** — elements cascade in sequentially on every page load
- **Persistent cross-site theme sync** — share a theme code with other users using Firebase Realtime Database

### Theming
A theme sync code lets you share your colour customisation across three related sites:
- `mc-toolkit` (this project)
- `mcmodrpupdater`
- `portfolio`

Themes are stored under `/themes/{code}` in Firebase and loaded automatically on page load.

---

## 🔌 External APIs Used

| API | Used By |
|-----|---------|
| [mcsrvstat.us](https://api.mcsrvstat.us) | Server Pinger — server status, MOTD, players |
| [playerdb.co](https://playerdb.co) | Player Lookup — UUID, username, cape data |
| [mc-heads.net](https://mc-heads.net) | Player Lookup — skin textures |
| [Firebase Realtime Database](https://firebase.google.com) | Theme sync engine |

> **Note:** All API calls are made client-side. No data is ever proxied through a server.

---

## 🧱 Tech Stack

- **HTML5** — Semantic structure
- **Vanilla CSS** — Custom design system, no frameworks
- **Vanilla JS** — Zero dependencies (except `skinview3d` for 3D skin rendering)
- **Firebase** — Realtime Database for theme code syncing
- **Vercel** — Static hosting with clean URL support

---

## 📜 License

MIT — free to use, modify, and deploy. Credit appreciated but not required.

---

<div align="center">
  Made with 💚 for the Minecraft community.
</div>
