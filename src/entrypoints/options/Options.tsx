import React from "react";
import ReactDOM from "react-dom/client";

import { Header } from "@/components/header";

import "@/styles/globals.css";

function Options() {
  return (
    <>
      <div className="relative flex flex-col bg-background font-sans antialiased">
        <Header />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
