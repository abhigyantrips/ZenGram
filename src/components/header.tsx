import pageIcon from "data-base64:@assets/icon.png";

import { ThemeSwitcher } from "@/components/theme-switcher";

import "@fontsource/cookie";

export function Header() {
  return (
    <header className="sticky inset-0 top-0 z-50 flex h-16 w-full flex-col items-center justify-around border-b bg-background/60 px-6 py-0 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="container relative flex w-full flex-1 items-center">
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-initial select-none flex-row items-center justify-start p-0">
            <img src={pageIcon} alt="Page Icon" height={32} width={32} />
            <span
              style={{
                fontFamily: "Cookie",
              }}
              className="text-xl">
              Zengram
            </span>
          </div>
        </div>
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
