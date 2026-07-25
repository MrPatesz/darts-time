import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    server: { open: true },
    base: "/darts-time/",
    plugins: [
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        VitePWA({
            registerType: "autoUpdate",
            manifest: false,
            manifestFilename: "site.webmanifest",
        }),
    ],
});
