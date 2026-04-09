import "@fontsource/cookie/400.css";

import { RiDiscordFill } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Header() {
  return (
    <header className="bg-background/60 sticky inset-0 top-0 z-50 flex h-20 w-full flex-col items-center justify-around border-b backdrop-blur-[5px] backdrop-saturate-180">
      <nav className="relative container flex w-full flex-1 items-center px-6">
        <div className="flex w-full items-center gap-6">
          <span
            style={{ fontFamily: "Cookie, cursive" }}
            className="text-3xl select-none">
            Zengram
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="secondary"
                className="group cursor-pointer hover:bg-purple-400/60"
                asChild>
                <a href="https://ko-fi.com/abhigyantrips" target="_blank">
                  <RiDiscordFill className="size-5 transition-transform duration-350 group-hover:rotate-360" />
                  Discord
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>WAZZZUUUP</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </header>
  );
}
