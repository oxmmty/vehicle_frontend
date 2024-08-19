/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        'bg-light': 'var(--bg-light)',
        'base-200': 'var(--base-200)',
        'bg-light-dark': 'var(--bg-light-dark)',
        'bg-dark': 'var(--bg-dark)',
        'base-500': 'var(--base-500)',
        'base-600': 'var(--base-600)',
        'base-700': 'var(--base-700)',
        'base-800': 'var(--base-800)',
        'base-900': 'var(--base-900)',
        'base-primary': 'var(--base-primary)',
        'hover-primary': 'var(--hover-primary)',
        'txt-100': 'var(--txt-100)',
        'text-200': 'var(--text-200)',
        'text-300': 'var(--text-300)',
        'border-100': 'var(--border-100)',
        'colorPrimary': 'var(--colorPrimary)',
        'colorSuccess': 'var(--colorSuccess)',
        'colorWarning': 'var(--colorWarning)',
        'colorError': 'var(--colorError)',
        'colorLink': 'var(--colorLink)',
      },
      boxShadow: {
        'custom': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '844px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      
      '2xl': '1400px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [],
}

