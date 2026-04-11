import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#1A365D" },
          600: { value: "#153E75" },
        },
      },
    },
    semanticTokens: {
      colors: {
        selection: {
          // Azul padrão do Windows
          bg: { value: "#0078D7" },
          fg: { value: "white" },
        },
      },
    },
  },
  globalCss: {
    // Aqui é onde a mágica da seleção acontece no navegador
    "::selection": {
      bg: "#0078D7", // Azul padrão do Windows
      color: "white",
    },
    "h1, h2, h3, b, strong": {
      color: "#2D3748", 
    },
  },
});

export const system = createSystem(defaultConfig, config);