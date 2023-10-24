import type { Post } from "$lib/typing"
import Paging from '$lib/utils/paging'

export async function load({ fetch }) {
  const res = await fetch('/blog/pages')
  const resPosts = await res.json() as Post[]
  const maxPost = 20

  return { posts: Paging(resPosts, maxPost) }
}
