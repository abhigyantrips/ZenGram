import "@fontsource/cookie/400.css";

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
        <div />
      </nav>
    </header>
  );
}
