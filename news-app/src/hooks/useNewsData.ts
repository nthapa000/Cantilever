import { Article } from "@/@types/news";

const useNewsData = (initialMainFeaturedPost: Article | null, initialFeaturedPosts: Article[], initialPosts: Article[], initialBookmarks: Article[]) => {
  return {
    mainFeaturedPost: initialMainFeaturedPost,
    featuredPosts: initialFeaturedPosts || [],
    posts: initialPosts || [],
    bookmarks: initialBookmarks || []
  };
};

export default useNewsData;
