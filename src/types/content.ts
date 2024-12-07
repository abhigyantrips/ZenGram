export type DefaultOptions = {
  blockStories: boolean;
  blockReels: boolean;
  blockExplore: boolean;
  blockPosts: boolean | "suggested";
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
  stories: string;
  reels: string;
  explore: string;
};