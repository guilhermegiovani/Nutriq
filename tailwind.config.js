/** @type {import('tailwindcss').Config} */
module.exports = {
  // Arquivos onde o Tailwind deve procurar classes utilitárias
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  // Preset do NativeWind para React Native
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Cores da marca Nutriq (ajuste depois no design)
      colors: {
        primary: '#16a34a',
        secondary: '#0f766e',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        muted: '#64748b',
      },
    },
  },
  plugins: [],
};
