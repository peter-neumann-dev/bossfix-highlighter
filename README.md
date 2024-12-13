<div align="center">

![Extension logo](public/icons/ext-icon-48.png)

# BossFix Highlighter

**Ohne BossFix läuft hier nix! 🚀**

[![Chrome Manifest V3](https://img.shields.io/badge/Chrome_Manifest-3-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://developer.chrome.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-10-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Vite.js](https://img.shields.io/badge/Vite.js-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

## What is it?

A Chrome extension that adds some fun and flair to your code repository browsing experience by highlighting all
occurrences of "bossfix" with interactive elements. Originally created as a humorous gift for digital "Schrottwichteln"
(German equivalent of a White Elephant gift exchange) - because who doesn't need their commits to be a bit more
boss-like? 🎩

## Features

- ✨ Automatically highlights all occurrences of "bossfix" on supported code repository hosts
- 🎨 Beautiful gradient highlighting with hover effects
- 🔊 Interactive sound effect on hover
- 💬 Random motivational toast messages in German (25+ unique messages)
- 🎯 Works on GitHub, GitLab, and Bitbucket
- 🎉 Fun emoji decorations

## Installation

1. Download the latest release here: [Releases](https://github.com/peter-neumann-dev/bossfix-highlighter/releases)
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Technical Details

- Chrome extension based on Manifest V3
- MutationObserver for dynamic content monitoring
- Custom CSS animations and gradients
- Audio playback for hover effects
- Vite.js for building and bundling
- TypeScript for type-safe development

## Development

### Requirements

- Node.js 22
- npm 10
- Vite.js 6
- TypeScript 5

### Setup

```bash
npm install
```

### Scripts

Development build with watch mode

```bash
npm run dev
```

Development build

```bash
npm run build
```

Production build

```bash
npm run build:prod
```

Format code with Prettier

```bash
npm run format
```

Run type checking

```bash
npm run test
```

Create a release archive

```bash
npm run release
```
