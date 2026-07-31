import { ThinkingOrbEngine, AGENT_STATES, COLOR_THEMES } from '../engine/OrbEngine.js';

export class ThinkingOrbElement extends (typeof HTMLElement !== 'undefined' ? HTMLElement : class {}) {
  static get observedAttributes() {
    return ['state', 'theme', 'size', 'speed'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.canvas = null;
    this.engine = null;
  }

  connectedCallback() {
    const size = parseInt(this.getAttribute('size') || '180', 10);
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        canvas {
          display: block;
        }
        .aria-live {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>
      <div class="aria-live" aria-live="polite">AI Agent state: ${this.getAttribute('state') || 'thinking'}</div>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector('canvas');
    this.initEngine();
  }

  initEngine() {
    if (!this.canvas) return;

    if (this.engine) {
      this.engine.destroy();
    }

    const state = this.getAttribute('state') || AGENT_STATES.THINKING;
    const theme = this.getAttribute('theme') || 'NEURAL_PURPLE';
    const size = parseInt(this.getAttribute('size') || '180', 10);
    const speed = parseFloat(this.getAttribute('speed') || '1.0');

    this.engine = new ThinkingOrbEngine(this.canvas, {
      state,
      theme,
      size,
      speed
    });
    this.engine.start();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.engine) return;

    if (name === 'state') {
      this.engine.setState(newValue);
      const ariaLive = this.shadowRoot.querySelector('.aria-live');
      if (ariaLive) ariaLive.textContent = `AI Agent state: ${newValue}`;
    } else if (name === 'theme') {
      this.engine.setTheme(newValue);
    } else if (name === 'size' || name === 'speed') {
      this.initEngine();
    }
  }

  disconnectedCallback() {
    if (this.engine) {
      this.engine.destroy();
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('thinking-orb-pro')) {
  customElements.define('thinking-orb-pro', ThinkingOrbElement);
}
