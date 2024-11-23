import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#7F56D9'
      }
    }
  },

  plugins: []
} satisfies Config;
