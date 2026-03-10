module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "sans-serif"],
        display: ["Inter", "Geist", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Playfair Display", "serif"],
        mono: ["IBM Plex Mono", "Geist Mono", "monospace"]
      },
      colors: {
        aura: {
          bg: "hsl(0 0% 100%)",
          fg: "hsl(0 0% 9%)",
          surface: "hsl(0 0% 98%)",
          surfaceStrong: "hsl(0 0% 96%)",
          border: "hsl(0 0% 90%)",
          borderStrong: "hsl(0 0% 84%)",
          muted: "hsl(0 0% 45%)",
          primary: "#2563eb",
          primaryStrong: "#1d4ed8",
          primarySoft: "#3b82f6"
        }
      },
      borderRadius: {
        auraSm: "0.5rem",
        auraMd: "0.75rem",
        auraLg: "1rem",
        auraXl: "1.5rem",
        auraPill: "9999px"
      },
      boxShadow: {
        auraSm: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px",
        auraMd: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px"
      },
      maxWidth: {
        aura: "1400px"
      }
    }
  }
};
