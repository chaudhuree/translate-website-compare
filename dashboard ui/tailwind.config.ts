import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Optional: Center the container
        padding: '2rem', // Optional: Add padding
      },
      colors: {
        primary: "#040D1A",
        secondary: "#FFFFFF1A",
        default: "#4D6BDD",
      },
    },
  },
  plugins: [],
};

export default config;
