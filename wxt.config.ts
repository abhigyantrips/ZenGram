import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  runner: {
    disabled: true,
  },
  extensionApi: "chrome",

  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],

  manifest: {
    name: "ZenGram: Mindful Instagram, Your Way",
    permissions: ["storage"],
    host_permissions: ["*://www.instagram.com/*"],
    browser_specific_settings: {
      gecko: {
        id: "zengram@abhigyantrips.dev",
      },
    },
  },
});
