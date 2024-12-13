import "@/styles/globals.css";

import ReactDOM from "react-dom/client";

import ReloadDialog from "@/components/reload-dialog";

export default defineContentScript({
  matches: ["*://www.instagram.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
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

    console.log("ui", ui);

    ui.mount();
  },
});
