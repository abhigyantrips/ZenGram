import { extensionConfig } from "@/config/ext";

export function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container mx-auto flex w-full flex-1 flex-col items-center justify-between md:flex-row">
        <div className="text-muted-foreground py-3 text-center text-sm">
          <span>
            created by{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-foreground underline underline-offset-2 transition-colors duration-150"
              href="https://abhi.now/">
              Abhigyan Trips
            </a>
            .
          </span>
        </div>
        <div className="text-muted-foreground py-3 text-center text-sm">
          <span>
            licensed under{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-foreground underline underline-offset-2 transition-colors duration-150"
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
              className="hover:text-foreground underline underline-offset-2 transition-colors duration-150"
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
