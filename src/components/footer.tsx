import { extensionConfig } from "@/config/ext";

export function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container flex w-full flex-1 flex-col items-center justify-between md:flex-row">
        <div className="py-3 text-center text-sm text-muted-foreground">
          <span>
            created by{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
              href="https://abhigyantrips.dev/">
              Abhigyan Trips
            </a>
            .
          </span>
        </div>
        <div className="py-3 text-center text-sm text-muted-foreground">
          <span>
            licensed under{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
              href={extensionConfig.license.url}>
              {extensionConfig.license.name}
            </a>
            .{" "}
          </span>
          <span>
            source code on{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="underline underline-offset-2 transition-colors duration-150 hover:text-foreground"
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
