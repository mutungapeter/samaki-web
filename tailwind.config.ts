import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Open Sans', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        
      },
      colors: {
        primary: '#14532D', 
        secondary: '#6A9C89', 
        light: '#C4DAD2'
          },
    
    },
  },
  plugins: [
   
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
