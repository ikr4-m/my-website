import type { Post } from "$lib/typing"

export async function load({ fetch }) {
  const res = await fetch('/blog/pages')
  const posts = await res.json() as Post[]

  return { posts }
}
