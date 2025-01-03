import { selectors, urls } from "@/config/content";
import { extensionConfig } from "@/config/ext";
import { extensionOptions } from "@/utils/storage";

export default defineContentScript({
  matches: ["*://www.instagram.com/*"],
  runAt: "document_start",

  async main() {
    const options = await extensionOptions.getValue();

    const mutationObserver = new MutationObserver(onMutation);

    if (!options.enabled) {
      console.log(`${extensionConfig.name} | Extension disabled. Exiting...`);
      return;
    } else {
      startObserver();
    }

    function startObserver() {
      mutationObserver.observe(document, {
        subtree: true,
        childList: true,
      });

      onMutation();
    }

    function onMutation() {
      const path = window.location.pathname;
      const params = window.location.search;
      const body = document.body;

      // Remove navigation links
      const exploreLink = body?.querySelector(selectors.nav.explore);
      const reelsLink = body?.querySelector(selectors.nav.reels);
      options.blockExplore && exploreLink?.remove();
      options.blockReels && reelsLink?.remove();

      if (path === urls.base) {
        // If redirect mode is set to 'messages', skip removing other elements.
        if (options.redirectMode === "messages") {
          window.location.href = urls.messages;
          return;
        }

        // If redirect mode is set to 'following', skip removing other elements.
        if (
          options.redirectMode === "following" &&
          !params.includes("variant=following")
        ) {
          window.location.href = urls.following;
        }

        // Remove stories
        const storyFeed = body?.querySelector(selectors.storyFeed);
        options.blockStories && storyFeed?.remove();

        // Remove posts
        if (options.blockPosts === true) {
          const posts = body?.querySelector(selectors.posts.base);
          const postsLoader = body?.querySelector(selectors.posts.loader);
          const postsContainer = posts?.closest("div");
          postsContainer?.remove();
          postsLoader?.remove();
        }

        // Remove sidebar / suggested followers
        if (options.blockSidebar === true) {
          const sidebarBase = body?.querySelector(selectors.sidebar.base);
          const sidebar = sidebarBase?.nextElementSibling;
          sidebar?.remove();
        } else if (options.blockSidebar === "suggested") {
          const suggestedFollowersLink = body?.querySelector(
            selectors.sidebar.suggestedFollowers
          );
          const suggestedFollowersTitle =
            suggestedFollowersLink?.closest("div");
          const suggestedFollowers =
            suggestedFollowersTitle?.nextElementSibling;
          suggestedFollowers?.remove();
          suggestedFollowersTitle?.remove();
        }
      }

      if (path.includes(urls.reels) && options.blockReels) {
        const main = body?.querySelector(selectors.main);
        main?.remove();
      }

      if (path.includes(urls.explore) && options.blockExplore) {
        const main = body?.querySelector(selectors.main);
        main?.remove();
      }

      if (path.includes(urls.stories) && options.blockStories) {
        const storiesSection = body?.querySelector("section");
        storiesSection?.remove();
      }
    }
  },
});
