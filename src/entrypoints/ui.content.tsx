import "@/styles/globals.css";

import ReactDOM from "react-dom/client";
import { ShadowRootContentScriptUi } from "wxt/client";

import ReloadDialog from "@/components/reload-dialog";

export default defineContentScript({
  matches: ["*://www.instagram.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let uiInstance: ShadowRootContentScriptUi<ReactDOM.Root>;

    browser.runtime.onMessage.addListener(
      async (message, _sender, _sendResponse) => {
        if (message.type === "EXT_SETTINGS_UPDATED") {
          if (!uiInstance) {
            uiInstance = await createShadowRootUi(ctx, {
              name: "zengram-reload-dialog",
              position: "inline",
              anchor: "body",
              append: "first",
              onMount: (container) => {
                const app = document.createElement("div");
                container.append(app);

                const root = ReactDOM.createRoot(app);
                root.render(<ReloadDialog />);
                return root;
              },
              onRemove: (root) => {
                root?.unmount();
              },
            });
            uiInstance.mount();
          }
        }

        return true;
      }
    );
  },
});
