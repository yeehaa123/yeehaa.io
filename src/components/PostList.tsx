import { PostListing } from "."
import type { PostListingProps } from "./Postlisting"

type PostData = {
  slug: string,
  data: PostListingProps
}

export function PostList({ posts }: { posts: PostData[] }) {
  return posts.map(({ slug, data }) => <PostListing {...data} order={1} slug={slug} />)
}
