export { ThinkingOrbEngine, AGENT_STATES, COLOR_THEMES } from './engine/OrbEngine.js';
export { ThinkingOrbElement } from './components/ThinkingOrbElement.js';

/**
 * React Component Wrapper (Zero-dependency shim)
 */
export function createReactThinkingOrb(React) {
  if (!React || !React.useRef || !React.useEffect) {
    throw new Error('React with Hooks support required for createReactThinkingOrb');
  }

  return function ThinkingOrb({ state = 'thinking', theme = 'NEURAL_PURPLE', size = 180, speed = 1.0 }) {
    const canvasRef = React.useRef(null);
    const engineRef = React.useRef(null);

    React.useEffect(() => {
      if (canvasRef.current) {
        engineRef.current = new ThinkingOrbEngine(canvasRef.current, {
          state,
          theme,
          size,
          speed
        });
        engineRef.current.start();
      }

      return () => {
        if (engineRef.current) {
          engineRef.current.destroy();
        }
      };
    }, [state, theme, size, speed]);

    return React.createElement('canvas', { ref: canvasRef, width: size, height: size });
  };
}
