import { extensionConfig } from "@/config/ext";

export function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container flex w-full flex-1 flex-col items-center justify-between md:flex-row">
        <div className="py-3 text-center text-sm text-muted-foreground">
          <span>
            Created by{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline transition-colors duration-150 hover:text-foreground"
              href="https://abhigyantrips.dev/">
              Abhigyan Trips
            </a>
            .{" "}
          </span>
          <span>
            Source code on{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline transition-colors duration-150 hover:text-foreground"
              href={extensionConfig.source}>
              GitHub
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
