"use client";

import { Bolt } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import "tailwindcss-animate";

import { Button } from "@/components/ui/button";

import "@/styles/globals.css";

import { extensionOptions } from "@/utils/storage";
import { cn } from "@/utils/utils";

import extLogo from "/logo.svg";

function Popup() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const isEnabled = (await extensionOptions.getValue()).enabled;

      setEnabled(isEnabled);
    })();
  }, []);

  const toggleExtension = async () => {
    const options = await extensionOptions.getValue();

    setEnabled(!options.enabled);
    await extensionOptions.setValue({
      ...options,
      enabled: !options.enabled,
    });
  };

  return (
    <>
      <div className="flex min-h-[200px] w-[300px] flex-col items-center bg-background p-2">
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => browser.runtime.openOptionsPage()}>
            <Bolt />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-foreground">
          <img
            src={extLogo}
            className={cn(
              "size-32 transition-all duration-300",
              enabled ? "grayscale-0" : "grayscale"
            )}
            alt="Logo"
          />
          <span className="font-bold transition-all duration-300">
            extension {enabled ? "enabled" : "disabled"}.
            {!enabled && (
              <>
                {" "}
                <span
                  className="cursor-pointer underline underline-offset-2 hover:decoration-2"
                  onClick={() => toggleExtension()}>
                  enable it?
                </span>
              </>
            )}
          </span>
          <p className="text-center text-xs">
            you have used Instagram for <b>2,494 minutes today</b>. that is{" "}
            <b>20%</b> of the day.
          </p>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
