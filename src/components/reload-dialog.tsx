export default function ReloadDialog() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-xs items-start rounded-lg border bg-background/80 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="p-2">
        <svg
          className="size-20"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="instagramGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#4f5bd5" />
              <stop offset="25%" stop-color="#962fbf" />
              <stop offset="50%" stop-color="#d62976" />
              <stop offset="75%" stop-color="#fa7e1e" />
              <stop offset="100%" stop-color="#feda75" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <mask id="path-mask">
              <g
                fill="none"
                stroke="white"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75" />
                <path d="M9.42864 15.0036L8.5715 16.8486C8.5715 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42864 21 6.42864 21H8.50007L10.7501 19.75L13.5001 18" />
                <path d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261" />
                <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" />
              </g>
            </mask>
          </defs>
          <rect
            width="24"
            height="24"
            fill="url(#instagramGradient)"
            mask="url(#path-mask)"></rect>
        </svg>
      </div>
      <div className="flex flex-col flex-wrap py-2">
        <h3 className="font-semibold">the settings were changed.</h3>
        <p className="text-muted-foreground">
          please{" "}
          <span
            className="cursor-pointer underline underline-offset-2 hover:decoration-2"
            onClick={() => window.location.reload()}>
            refresh
          </span>{" "}
          the page to apply your changes.
        </p>
      </div>
    </div>
  );
}
