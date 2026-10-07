/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic civic palette for Wisconsin Tax Flow
        wi: {
          dark: '#0f172a',    // Slate 900
          navy: '#1e293b',    // Slate 800
          border: '#e2e8f0',  // Slate 200
          muted: '#64748b',   // Slate 500
          light: '#f8fafc',   // Slate 50
        },
        // Diverging choropleth indicators
        flow: {
          donor: '#0d9488',     // Teal 600 (Sends more than returns)
          donorLight: '#ccfbf1',// Teal 100
          neutral: '#f59e0b',   // Amber 500 (Balanced ~ $1.00 return)
          recipient: '#e11d48', // Rose 600 (Receives more aids than taxes sent)
          recipientLight: '#ffe4e6', // Rose 100
        },
      },
    },
  },
  plugins: [],
};
