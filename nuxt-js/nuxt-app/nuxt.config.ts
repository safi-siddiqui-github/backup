import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "https://api.example.com",
    },
    // .env will override the value of apiSecret with NUXT_API_SECRET
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxt/ui"],
});
