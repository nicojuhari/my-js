// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    base: "/my-js/",
    root,
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, "index.html"),
                about: resolve(root, "about", "index.html"),
                "pomodoro-timer": resolve(root, "pomodoro-timer", "index.html"),
            },
        },
    },
    publicDir: resolve(__dirname, "public"),
});
