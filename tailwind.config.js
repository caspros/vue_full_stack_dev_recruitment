/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("./src/assets/tailwind/colors");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "w-[20px]",
    "h-[20px]",
    {
      pattern:
        /bg-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-50/,
    },
    {
      pattern:
        /bg-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-100/,
    },
    {
      pattern:
        /bg-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-200/,
    },
    {
      pattern:
        /text-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-700/,
    },
    {
      pattern:
        /text-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-500/,
    },
    {
      pattern:
        /border-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-200/,
    },
    {
      pattern:
        /border-(gray|brand|error|warning|success|gray-blue|blue-light|blue-dark|blue|indigo|purple|pink|orange)-500/,
    },
  ],
  variants: {
    fontSize: [],
  },
  colors: {
    gray: colors.gray,
  },
  theme: {
    extend: {
      // colors: {
      //   primary: {
      //     950: "#000"
      //   },
      // },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        // Możesz dodać więcej według potrzeb
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "onest": ["Onest", "sans-serif"],
        "jakarta": ["Jakarta", "sans-serif"],
      },
      colors: {
        success: colors.success,
        warning: colors.warning,
        pink: colors.pink,
        base: colors.base,
        brand: colors.brand,
        error: colors.error,
        cyan: colors.cyan,
        blue: colors.blue,
        "blue-light": colors["blue-light"],
        "blue-dark": colors["blue-dark"],
        cg: colors.cg,
      },
      spacing: getSpacing(50),
      // minHeight: getMinHeight(10, 30),
      // minHeight: {
      //   "36": "36px",
      //   "40": "40px",
      //   "44": "44px",
      //   "48": "48px",
      //   "60": "60px",
      // },
      borderWidth: {
        DEFAULT: "1px",
        "0": "0",
        "2": "2px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
      },
      fontSize: {
        "xs": "12px",
        "sm": "14px",
        "md": "16px",
        "lg": "18px",
        "xl": "20px",
        "35xl": "32px",
        "display-xs": "24px",
        "display-sm": "30px",
        "display-md": "36px",
        "display-lg": "48px",
        "display-xl": "60px",
        "display-2xl": "72px",
      },
      boxShadow: {
        "customerNav": "0 16px 10px 0px rgba(20, 20, 20, 0.04)",
        "acceptApplication": "0px -4px 11px 0px #1414141F",
      },
      borderRadius: {
        "DEFAULT": "2px",
        "md": "4px",
        "lg": "8px",
        "2lg": "10px",
        "xl": "16px",
        "2xl": "32px",
        "3xl": "64px",
        "full": "9999px",
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1302px",
        },
        padding: {
          DEFAULT: "10px",
          sm: "10px",
          lg: "10px",
          xl: "10px",
        },
      },
      lineHeight: {
        "3.5": "14px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    plugin(function ({ addUtilities, theme }) {
      const fontSize = theme("fontSize");
      const newUtilities = {
        ".min-h-screen": {
          "min-height": "100dvh",
        },
      };

      for (const size in fontSize) {
        if (fontSize.hasOwnProperty(size)) {
          newUtilities[`.text-${size}`] = {
            lineHeight: `calc(${fontSize[size]} + ${getFontSize(size)}px)`,
          };
        }
      }

      addUtilities(newUtilities);
    }),
  ],
};

function getSpacing(max) {
  let spacing = {};
  for (let i = 1; i <= max; i++) {
    spacing[i] = `${i * 2}px`;
  }
  return spacing;
}

// function getMinHeight(min, max) {
//   let minHeight = {};
//   for (let i = min; i <= max; i = i + 2) {
//     minHeight[i] = `${i}px`;
//   }
//   return minHeight;
// }

const groupedFontSizes = {
  "xs,sm": 6,
  "md,display-xs,display-sm,display-md,35xl": 8,
  "lg,xl": 10,
  "display-lg,display-xl": 12,
  "display-2xl": 28,
};

const getFontSize = key => {
  for (let groupedKey in groupedFontSizes) {
    if (groupedKey.split(",").includes(key)) {
      return groupedFontSizes[groupedKey];
    }
  }
};
