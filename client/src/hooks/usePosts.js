import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])
}
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    return useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])
}
export const usePostsByTheme = (posts, sort, query, themeId) => {
    const sortedPosts = usePosts(posts, sort, query)
    return useMemo(() => {
        if(themeId) {
            return sortedPosts.filter(post => post.PostThemeId === themeId)
        } else
            return sortedPosts
    }, [query, sortedPosts, themeId])
}
