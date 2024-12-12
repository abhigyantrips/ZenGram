import extLogo from "@/assets/icon.png";

import "@fontsource/cookie";

export function Header() {
  return (
    <header className="sticky inset-0 top-0 z-50 flex h-20 w-full flex-col items-center justify-around border-b bg-background/60 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="container relative flex w-full flex-1 items-center">
        <div className="flex w-full items-center gap-6">
          <span
            style={{ fontFamily: "Cookie, cursive" }}
            className="select-none text-3xl">
            Zengram
          </span>
        </div>
        <div />
      </nav>
    </header>
  );
}
