import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tagName => {
              return (
                tagName === "vue-advanced-chat" || tagName === "emoji-picker"
              );
            },
          },
        },
      }),
      ["production"].includes(env.VITE_ENVIRONMENT) && mode === "production"
        ? null
        : eslintPlugin(),
      {
        name: "remove-preload",
        enforce: "post",
        transformIndexHtml(html) {
          return html.replace(/<link rel="modulepreload".*?>/g, "");
        },
      },
    ],
    build: {
      modulePreload: false,
      manifest: true,
      rollupOptions: {
        // external: [
        //   "@cometchat/chat-uikit-vue",
        //   "@cometchat/chat-sdk-javascript",
        //   "@cometchat/uikit-shared",
        // ],
        output: {
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[hash].[ext]",
          manualChunks: id => {
            if (id.includes("node_modules")) {
              const packageName = id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0];
              return `vendor-${packageName}`;
            }
          },
        },
      },
    },
    server: {
      // Use the environment variables or fallback to defaults
      port: parseInt(env.VITE_CUSTOM_PORT) || 3000,
      host: env.VITE_CUSTOM_HOST || "mamamia.mamamia.app",
      watch: {
        usePolling: true,
      },
      https: false,
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
      include: ["@cometchat/chat-uikit-vue", "@cometchat/chat-sdk-javascript"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"), // Wskazuje na katalog główny projektu
      },
    },
  };
});
