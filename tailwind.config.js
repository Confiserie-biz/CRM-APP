/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        bg: {
          main: '#0a0f1a',
          card: '#111827',
        },
        accent: {
          cyan: '#00ffcc',
          amber: '#f59e0b',
          violet: '#818cf8',
        },
        border: {
          subtle: '#1f2937',
        },
        text: {
          primary: '#f1f5f9',
          muted: '#64748b',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px #00ffcc11',
      },
      borderRadius: {
        card: '12px',
      },
      transitionDuration: {
        200: '200ms',
      },
    },
  },
  plugins: [],
}


