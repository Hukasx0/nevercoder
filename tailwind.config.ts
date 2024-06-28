import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {nextui} from "@nextui-org/react";

export default {
  content: ["./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    animation: {
      "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
    },
    keyframes: {
      "border-beam": {
        "100%": {
          "offset-distance": "100%",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
