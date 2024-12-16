import React from "react";
import ReactDOM from "react-dom/client";

import { Header } from "@/components/header";

import "@/styles/globals.css";

import { Button } from "@/components/ui/button";

function Options() {
  return (
    <>
      <div className="relative flex flex-col bg-background font-sans antialiased">
        <Header />
        <div className="container flex-1">
          <div className="mx-auto flex min-h-[calc(100vh_-_theme(spacing.32))] max-w-screen-md flex-col gap-2 p-6">
            <Button
              onClick={() => {
                browser.tabs
                  .query({ url: "*://www.instagram.com/*" })
                  .then((tabs) => {
                    for (const tab of tabs) {
                      browser.tabs.sendMessage(tab.id!, {
                        type: "EXT_SETTINGS_UPDATED",
                      });
                    }
                  });
              }}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
