export type ExtensionOptions = {
  enabled: boolean;
  redirectMode: "none" | "following" | "messages";
  blockStories: boolean;
  blockReels: boolean;
  blockExplore: boolean;
  blockPosts: boolean;
  blockSidebar: boolean | "suggested";
};

export type Selectors = {
  main: string;
  storyFeed: string;
  posts: {
    base: string;
    loader: string;
  };
  sidebar: {
    base: string;
    suggestedFollowers: string;
  };
  nav: {
    direct: string;
    activity: string;
    explore: string;
    reels: string;
  };
};

export type URLs = {
  base: string;
  following: string;
  stories: string;
  reels: string;
  explore: string;
  messages: string;
};
