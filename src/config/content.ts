import type { DefaultOptions, Selectors, URLs } from "@/types/content";

export const defaultOptions: DefaultOptions = {
  blockStories: true,
  blockReels: true,
  blockExplore: true,
  blockPosts: "suggested",
  blockSidebar: 'suggested',
};

export const labelsArray = Object.keys(defaultOptions);

export const selectors: Selectors = {
  main: "[role=main]",
  storyFeed: "div[role='menu']",
  posts: {
    base: "article",
    loader: "[data-visualcompletion='loading-state']",
  },
  sidebar: {
    base: "",
    suggestedFollowers: "a[href*='/explore/people/']",
  },
  nav: {
    direct: "a[href*='/direct/inbox/']",
    activity: "a[href*='/accounts/activity']",
    explore: "a[href='/explore/']",
    reels: "a[href*='/reels/']",
  },
};

export const urls: URLs = {
  base: "/",
  stories: "/stories",
  reels: "/reels",
  explore: "/explore",
};
