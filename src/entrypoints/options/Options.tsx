import React from "react";
import ReactDOM from "react-dom/client";

import { ExtensionControls } from "@/components/extension-controls";
import { Header } from "@/components/header";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";

function Options() {
  return (
    <>
      <div className="relative flex flex-col bg-background font-sans antialiased">
        <Header />
        <div className="container flex-1">
          <div className="mx-auto flex min-h-[calc(100vh_-_theme(spacing.32))] max-w-screen-md flex-col space-y-6 p-6">
            <div className="flex flex-col space-y-2 pt-24">
              <h1 className="text-3xl font-semibold">extension controls.</h1>
              <p className="text-gray-500">
                control your Instagram experience with ease.
              </p>
            </div>
            <ExtensionControls />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
