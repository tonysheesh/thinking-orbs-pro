/**
 * ThinkingOrbsPro - Core Canvas Engine
 * High-performance, zero-dependency particle orb renderer for AI agent states.
 */

export const AGENT_STATES = {
  IDLE: 'idle',
  THINKING: 'thinking',
  REASONING_DEEP: 'reasoning_deep',
  TOOL_CALL: 'tool_call',
  SUBAGENT_SPAWN: 'subagent_spawn',
  STREAMING_TOKENS: 'streaming_tokens',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const COLOR_THEMES = {
  CYBER_CYAN: {
    primary: '#00f2fe',
    secondary: '#4facfe',
    glow: 'rgba(0, 242, 254, 0.4)',
    background: '#0a0f1d'
  },
  NEURAL_PURPLE: {
    primary: '#b224ef',
    secondary: '#7579ff',
    glow: 'rgba(178, 36, 239, 0.4)',
    background: '#120a1d'
  },
  SOLAR_GOLD: {
    primary: '#ffb347',
    secondary: '#ffcc33',
    glow: 'rgba(255, 179, 71, 0.4)',
    background: '#1a130a'
  },
  EMERALD_MATRIX: {
    primary: '#00f5a0',
    secondary: '#00d9f5',
    glow: 'rgba(0, 245, 160, 0.4)',
    background: '#0a1a14'
  },
  CRIMSON_ALERT: {
    primary: '#ff416c',
    secondary: '#ff4b2b',
    glow: 'rgba(255, 65, 108, 0.4)',
    background: '#1a0a0f'
  }
};

export class ThinkingOrbEngine {
  constructor(canvas, options = {}) {
    if (!canvas) {
      throw new Error('Canvas element or container required');
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.state = options.state || AGENT_STATES.THINKING;
    this.theme = COLOR_THEMES[options.theme] || COLOR_THEMES.NEURAL_PURPLE;
    this.particleCount = options.particleCount || 16;
    this.speedMultiplier = options.speed || 1.0;
    this.size = options.size || 180;
    this.interactive = options.interactive !== false;
    
    this.particles = [];
    this.animFrameId = null;
    this.time = 0;
    this.isDestroyed = false;

    this.initCanvas();
    this.initParticles();
  }

  initCanvas() {
    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    this.canvas.width = this.size * dpr;
    this.canvas.height = this.size * dpr;
    this.canvas.style.width = `${this.size}px`;
    this.canvas.style.height = `${this.size}px`;
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  initParticles() {
    this.particles = [];
    const count = this.state === AGENT_STATES.REASONING_DEEP ? this.particleCount * 2 : this.particleCount;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radiusOffset = (Math.random() - 0.5) * 15;
      this.particles.push({
        angle,
        radius: (this.size * 0.28) + radiusOffset,
        baseRadius: (this.size * 0.28) + radiusOffset,
        speed: (0.015 + Math.random() * 0.02) * this.speedMultiplier,
        size: 3.5 + Math.random() * 4,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  setState(newState) {
    if (Object.values(AGENT_STATES).includes(newState)) {
      this.state = newState;
      this.initParticles();
    }
  }

  setTheme(themeKey) {
    if (COLOR_THEMES[themeKey]) {
      this.theme = COLOR_THEMES[themeKey];
    }
  }

  renderFrame() {
    if (this.isDestroyed || !this.ctx) return;

    const ctx = this.ctx;
    const center = this.size / 2;
    this.time += 0.03 * this.speedMultiplier;

    ctx.clearRect(0, 0, this.size, this.size);

    // Draw background glow
    const glowGrad = ctx.createRadialGradient(center, center, 10, center, center, center * 0.85);
    glowGrad.addColorStop(0, this.theme.glow);
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(center, center, center * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // Core Orb pulsing
    let pulseScale = 1 + Math.sin(this.time * 2) * 0.08;
    if (this.state === AGENT_STATES.STREAMING_TOKENS) {
      pulseScale = 1 + Math.sin(this.time * 6) * 0.15;
    } else if (this.state === AGENT_STATES.ERROR) {
      pulseScale = 1 + (Math.random() - 0.5) * 0.1;
    }

    const coreGrad = ctx.createRadialGradient(center, center, 2, center, center, 35 * pulseScale);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, this.theme.primary);
    coreGrad.addColorStop(1, this.theme.secondary);

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(center, center, 28 * pulseScale, 0, Math.PI * 2);
    ctx.fill();

    // Render orbiting particles
    this.particles.forEach((p, idx) => {
      p.angle += p.speed;
      const wobble = Math.sin(this.time * 3 + p.pulseOffset) * 6;
      const currentRadius = p.baseRadius + wobble;

      const x = center + Math.cos(p.angle) * currentRadius;
      const y = center + Math.sin(p.angle) * currentRadius;

      ctx.save();
      ctx.fillStyle = idx % 2 === 0 ? this.theme.primary : this.theme.secondary;
      ctx.shadowColor = this.theme.primary;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw particle connections when in REASONING_DEEP state
      if (this.state === AGENT_STATES.REASONING_DEEP && idx < this.particles.length - 1) {
        const nextP = this.particles[idx + 1];
        const nx = center + Math.cos(nextP.angle) * nextP.baseRadius;
        const ny = center + Math.sin(nextP.angle) * nextP.baseRadius;
        const dist = Math.hypot(nx - x, ny - y);
        if (dist < 45) {
          ctx.strokeStyle = this.theme.primary;
          ctx.globalAlpha = 0.3 * (1 - dist / 45);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      }
    });

    if (typeof requestAnimationFrame !== 'undefined') {
      this.animFrameId = requestAnimationFrame(() => this.renderFrame());
    }
  }

  start() {
    this.isDestroyed = false;
    this.renderFrame();
  }

  stop() {
    if (this.animFrameId && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  destroy() {
    this.stop();
    this.isDestroyed = true;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.size, this.size);
    }
  }
}
