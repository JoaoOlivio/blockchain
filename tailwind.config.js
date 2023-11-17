/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./src/**/*.jsx"],

  theme: {
    extend: {
      colors: {
        'abacate': {
          100: '#657b36',
        },
        'vermelho': {
          100: '#f44e4e',
        }
      },
    },

  },
  plugins: [],
}

