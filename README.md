# 🔮 thinking-orbs-pro 🔮

> **🚀 High-Performance 60 FPS Zero-Dependency Canvas Engine for AI Agent States & Reasoning Pipelines 🧠**

`thinking-orbs-pro` is an ultra-lightweight, high-DPI HTML5 Canvas 2D engine engineered to visualize AI agent lifecycle states, reasoning trajectories, tool executions, and multi-subagent swarms in real time! ⚡

Inspired by top trending GitHub repository `Jakubantalik/thinking-orbs`, `thinking-orbs-pro` expands the visual vocabulary into **8 distinct agent lifecycle states** with zero runtime framework dependencies, native Web Component support, and built-in screen reader accessibility! 🎯

---

## 🌟 Key Features

- **🧠 8 Agent Lifecycle States**: Full rendering support for `IDLE`, `THINKING`, `REASONING_DEEP`, `TOOL_CALL`, `SUBAGENT_SPAWN`, `STREAMING_TOKENS`, `SUCCESS`, and `ERROR` 💫
- **⚡ Zero-Dependency 60 FPS Engine**: Ultra-lightweight HTML5 Canvas 2D particle dynamics with automatic retina high-DPI scaling 🎨
- **🧩 Universal Framework Targets**:
  - 📦 Native ES Module Engine (`ThinkingOrbEngine`)
  - 🌐 Custom Web Component (`<thinking-orb-pro>`)
  - ⚛️ React Component Wrapper (`createReactThinkingOrb`)
- **🎨 Dynamic Themes & Particle Physics**: Built-in color palettes (`NEURAL_PURPLE`, `CYBER_CYAN`, `SOLAR_GOLD`, `EMERALD_MATRIX`, `CRIMSON_ALERT`) with customizable particle counts, orbit radiuses, connection lines, and speed physics 🌌
- **♿ Screen Reader Accessibility**: Native ARIA live region support (`aria-live="polite"`) announcing agent state transitions dynamically 📢
- **🎛️ Interactive Studio Playground**: Embedded `demo/index.html` studio for live parameter manipulation, real-time preview, and HTML snippet export 💻

---

## 🛠️ Quick Start & Auto-Installer

### 📦 Automated Installation (with Error Resume 🔄)

Run our automated installer which includes **checkpoint tracking and error resume** (if an installation step fails, re-running automatically resumes from where it left off!):

```bash
chmod +x install.sh
./install.sh

# Or force resume from last checkpoint
./install.sh --resume
```

---

### 🌐 Web Component Usage (Vanilla HTML)

```html
<script type="module" src="https://unpkg.com/thinking-orbs-pro/dist/thinking-orb-pro.js"></script>

<thinking-orb-pro state="REASONING_DEEP" theme="NEURAL_PURPLE" speed="1.2"></thinking-orb-pro>
```

### ⚛️ React Component Usage

```tsx
import { ThinkingOrb } from 'thinking-orbs-pro/react';

export function AgentStatusCard({ state }) {
  return (
    <ThinkingOrb
      state={state}
      theme="CYBER_CYAN"
      particleCount={40}
      showOrbit={true}
      size={120}
    />
  );
}
```

---

## ⚡ Comparison & Why `thinking-orbs-pro` Is Superior

| Feature / Capability 🛠️ | Related Projects (`thinking-orbs`, etc.) 👵 | `thinking-orbs-pro` (Ours) 🚀 | Why Ours Is Better 🏆 |
| :--- | :--- | :--- | :--- |
| **Agent States Supported** | Basic 2-3 states (Thinking / Idle) | **8 Full Lifecycle States** (`IDLE`, `THINKING`, `REASONING_DEEP`, `TOOL_CALL`, `SUBAGENT_SPAWN`, `STREAMING`, `SUCCESS`, `ERROR`) 🧠 | Complete coverage for complex multi-agent workflows! 🌟 |
| **Framework Compatibility** | React-only or vanilla DOM | **Universal**: Native ES Modules, Custom Web Component (`<thinking-orb-pro>`), and React Wrapper 🧩 | Works seamlessly across React, Vue, Svelte, Angular, or plain HTML! 🌐 |
| **Performance & Rendering** | Heavy SVG / DOM manipulation | **60 FPS HTML5 Canvas 2D** with High-DPI Retina scaling ⚡ | Zero DOM lag, minimal CPU memory footprint! 📉 |
| **Accessibility (a11y)** | None / visual only | **Built-in ARIA Live Regions** ♿ | Screen readers dynamically announce agent state transitions! 📢 |
| **Visual Assets & Studio** | Manual setup required | **Embedded Studio Playground** (`demo/index.html`) + Gemini Generated Banner & Architecture assets 🎨 | Instant visual testing and exportable code snippets! 💻 |

---

## 🗺️ Roadmap

- **💻 WebGPU Particle Compute Shaders**: Upgrade 2D canvas particle physics to high-performance WebGPU compute shaders for 100,000+ simultaneous particles! 🚀
- **🎵 Audio-Reactive Visualization**: Add Web Audio API integration for real-time frequency spectrum analysis and sound-driven orb pulsations during agent speech! 🔊
- **🌐 Multi-Agent Swarm Topology**: Render interconnected clustered orbs representing multi-subagent hierarchy and message-passing topologies! 🐝
- **📦 Native Vue 3 & Svelte 5 Wrappers**: Official component packages for Vue and Svelte ecosystems! 💚
- **🎨 Live Theme Designer Export**: Interactive theme builder in Studio Playground allowing custom gradient stops, aura blur radii, and JSON configuration exports! ✨

---

## 📄 License

MIT © [tonysheesh](https://github.com/tonysheesh) 💖
