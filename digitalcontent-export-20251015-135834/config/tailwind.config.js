const plugin = require("tailwindcss/plugin");

const customPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".perspective-500": {
      transform: "perspective(500px)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
    ".margin-left-unset": {
      "margin-left": "unset",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xs": "321px", // small mobile
      xs: "480px", // mobile or phablet
      sm: "768px", // tablet
      md: "1014px", //desktop
      lg: "1336px", // desktop
    },
    extend: {
      backgroundImage: {
        "custom-radial-gradient":
          "radial-gradient(143.65% 117.62% at 12.65% 4.95%, #2A4390 12.27%, #4D47A4 50.5%, #063F7A 100%)",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.45)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        mdecRed: "#E62A32",
        mdecBlack: "#05171D",
        mdecDarkGray: "#272727",

        levelUpPink: "#d1438a",
        strongPink: "#CC2654",
        warmPink: "#FF456A",
        hotPink: "#D30AAE",
        lightPink: "#FFEEEE",

        brickRed: "#BC4110",
        warmerRed: "#D10B10",
        brightRed: "#CC3040",
        darkRed: "#B24863",
        lightRed: "#B24863",

        mdecGreen: "#107a6f",
        emeraldGreen: "#3C9D5D",
        brightTurquoise: "#13C1AE",
        brightGreen: "#56CA22",
        paleGreen: "#E5E684",
        sageGreen: "#D4E8D9",
        lightGreen: "#46b7b9",

        mdecPurple: "#3D298E",
        levelUpPurple: "#ab47bd",
        lightPurple: "#EAE8F3",
        royalPurple: "#5C0C76",
        brightPurple: "#E7D9F2",
        digitalPurple: "#76498f",
        darkPurple: "#3D1A5C",
        lilacPurple: "#89216b",
        violetPurple: "#590045",
        magentaPurple: "#95096e",

        hotSun: "#FFB414",
        sunset: "#F8C743",
        yellOrange: "#FEB62C",
        ochre: "#C6841D",
        champagne: "#FEEBC9",
        cocoa: "#4C211C",

        mdecBlue: "#0b20b3",
        darkBlue: "#083E7C",
        derantauDarkBlue: "#081A62",
        derantauLightBlue: "#e2f5ff",
        purpleBlue: "#4664FF",
        skyBlue: "#e2f5ff",
        lightBlue: "#CFE8EB",
        paleBlue: "#E5F2F1",
        airBlue: "#F3FCFB",
        glowBlue: "#1A72BF",
        skyBlue: "#e4f1f3",
        deDagangBlue: "#004FC9",
        clientCharterBlue: "#0062B4",

        superGray: "#383E43",
        darkGray: "#60676D",
        nardoGray: "#7D8386",
        mutedGray: "#9D9D9D",
        flatGray: "#C9C6C6",
        mediumGray: "#DCDCDC",
        lightGray: "#F0F1F3",
        airGray: "#F9F9F9",

        radarPurple: "#8D278A",
        radarPink: "#E74D95",
        radarBlue: "#06989F",
        radarOrange: "#A34A72",
        radarGreen: "#3BB04A",
      },
      borderRadius: {
        100: "100px",
      },
      spacing: {
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        13: "3.25rem",
        30: "7.5rem",
        46: "11.5rem",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    customPlugin,
  ],
  safelist: [
    "border-radarPurple",
    "border-radarPink",
    "border-radarGreen",
    "border-radarBlue",
    "border-radarOrange",
  ],
};
