import test from 'node:test';
import assert from 'node:assert';
import { ThinkingOrbEngine, AGENT_STATES, COLOR_THEMES } from '../src/engine/OrbEngine.js';

// Mock Canvas Context for headless Node.js testing
class MockContext2D {
  constructor() {
    this.fillStyle = '';
    this.strokeStyle = '';
    this.lineWidth = 1;
    this.globalAlpha = 1.0;
  }
  scale() {}
  clearRect() {}
  beginPath() {}
  arc() {}
  fill() {}
  stroke() {}
  save() {}
  restore() {}
  moveTo() {}
  lineTo() {}
  createRadialGradient() {
    return { addColorStop: () => {} };
  }
}

class MockCanvas {
  constructor(width = 180, height = 180) {
    this.width = width;
    this.height = height;
    this.style = {};
    this.ctx = new MockContext2D();
  }
  getContext() {
    return this.ctx;
  }
}

test('ThinkingOrbEngine initializes with default parameters', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas);

  assert.strictEqual(engine.state, AGENT_STATES.THINKING);
  assert.strictEqual(engine.particles.length, 16);
  assert.strictEqual(engine.isDestroyed, false);
});

test('ThinkingOrbEngine supports all agent lifecycle states', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas);

  Object.values(AGENT_STATES).forEach(state => {
    engine.setState(state);
    assert.strictEqual(engine.state, state);
  });
});

test('ThinkingOrbEngine spawns double particles during REASONING_DEEP state', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas, { particleCount: 10 });

  engine.setState(AGENT_STATES.REASONING_DEEP);
  assert.strictEqual(engine.particles.length, 20);
});

test('ThinkingOrbEngine switches themes dynamically', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas);

  engine.setTheme('CYBER_CYAN');
  assert.strictEqual(engine.theme, COLOR_THEMES.CYBER_CYAN);
});

test('ThinkingOrbEngine renders frame without throwing errors', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas);

  assert.doesNotThrow(() => {
    engine.renderFrame();
  });
});

test('ThinkingOrbEngine clean destruction prevents memory leak', () => {
  const canvas = new MockCanvas();
  const engine = new ThinkingOrbEngine(canvas);

  engine.destroy();
  assert.strictEqual(engine.isDestroyed, true);
});
