import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDirectory = fileURLToPath(
  new URL(".", import.meta.url)
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDirectory, "index.html"),
        privacyPolicy: resolve(rootDirectory, "privacy-policy/index.html"),
        termsOfService: resolve(rootDirectory, "terms-of-service/index.html"),
        researchDisclaimer: resolve(
          rootDirectory,
          "research-disclaimer/index.html"
        ),
      },
    },
  },
});
