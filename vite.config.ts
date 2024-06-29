import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true
      },

      manifest: {
        name: "daan-ei",
        short_name: "daan-ei",
        description: "Egglist for my son to keep track of customers",
        theme_color: "#07da63"
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ]
})
