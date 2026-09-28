# SkipShoot — AI Video Ad Production Portfolio & Platform

Official codebase for **SkipShoot**, high-performance landing page and portfolio showcasing AI video ad transformations, product demos, interactive comparison player, and project management.

## 🚀 Features

- **Interactive Comparison Player**: Side-by-side Before/After raw product photo to AI-generated video demonstration.
- **Dynamic Portfolio Grid**: Filterable projects by category (E-Commerce, Lifestyle, Food, Portrait).
- **Direct Video Sharing & Deep Linking**: URL hash-based direct links to specific portfolio pieces.
- **Optimized Video Delivery**: Web-optimized H.264 video assets with `moov` faststart atom for zero-buffering instant streaming.
- **Cloudflare Pages & Netlify Ready**: Built to deploy seamlessly with zero configuration on Cloudflare Pages, Netlify, or GitHub Pages.

---

## 📁 Project Structure

```text
├── assets/                  # High-resolution web-optimized images & video showcases
│   ├── agency-raw.png
│   ├── agency-result.mp4    # Faststart H.264 streamable demo video
│   ├── heatingpad-1.png
│   ├── heatingpad-result.mp4
│   ├── knm-result.mp4
│   ├── knm-thumb.png
│   ├── logo-mark-light.png
│   ├── omar sample.mp4
│   ├── omar sample.png
│   ├── revivaa-result.mp4
│   ├── spiceshop-result.mp4
│   ├── thandsup-result-1.mp4
│   └── thandsup-result-2.mp4
├── index.html               # Main application and presentation layer
├── deploy.js                # Automated deployment script for Netlify API
├── netlify.toml             # Netlify headers & redirect rules
└── package.json             # NPM metadata and scripts
```

---

## ⚡ Deployment Instructions

### Option 1: Cloudflare Pages (Recommended)

1. Connect your GitHub repository: [`aigentix-ai/skipshoot-cloudfare`](https://github.com/aigentix-ai/skipshoot-cloudfare)
2. Framework preset: **None / Static HTML**
3. Build command: *(leave empty)*
4. Build output directory: `.` or `/` (Root directory)
5. Save and Deploy!

> **Note**: All video assets in this repository have been strictly optimized to stay below Cloudflare Pages' 25 MiB asset limit.

### Option 2: Local Development

Simply open `index.html` in any modern web browser or serve via:
```bash
npx serve .
```
or with Python:
```bash
python -m http.server 8080
```

---

## 🛠️ Video Asset Guidelines

All showcase videos are encoded with:
- **Codec**: H.264 (AVC)
- **Audio**: AAC 128kbps stereo
- **Streaming Flag**: `-movflags +faststart` (ensures metadata is located at the front of the container for instantaneous browser streaming)
- **Maximum Asset Size**: < 25 MB per file for full Cloudflare compatibility.
