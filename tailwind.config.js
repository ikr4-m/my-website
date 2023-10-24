/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        nord: {
          polar: {
            '0': '#2E3440',
            '1': '#3B4252',
            '2': '#434C5E',
            '3': '#4C566A'
          },
          snow: {
            '0': '#D8DEE9',
            '1': '#E5E9F0',
            '2': '#ECEFF4'
          },
          frost: {
            '0': '#8FBCBB',
            '1': '#88C0D0',
            '2': '#81A1C1',
            '3': '#5E81AC'
          },
          aurora: {
            '0': '#BF616A',
            '1': '#D08770',
            '2': '#EBCB8B',
            '3': '#A3BE8C',
            '4': '#B48EAD'
          }
        }
      }
    },
  },
  plugins: [],
}

