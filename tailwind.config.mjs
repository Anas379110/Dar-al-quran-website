/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        quran: ['"Amiri Quran"', 'serif'], // خط عربي كلاسيكي لنص الآيات تحديدًا
      },
      colors: {
        // هوية دار القرآن — ذهبي + كحلي داكن فاخر (UI-UX.md، مؤكَّد)
        brand: {
          DEFAULT: '#C9A227',
          dark: '#0B1B33',
          light: '#FBF3D9',
        },
      },
    },
  },
  plugins: [],
};
