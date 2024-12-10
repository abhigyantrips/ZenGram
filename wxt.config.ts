import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  runner: {
    disabled: true,
  },
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],

  manifestVersion: 3,
  manifest: {
    permissions: ["storage"],
    browser_specific_settings: {
      gecko: {
        id: "zengram@abhigyantrips.dev",
      },
    },
  },
});
