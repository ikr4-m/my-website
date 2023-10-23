import type { Post } from "../../../app"

export async function load({ fetch }) {
  const res = await fetch('/blog/pages')
  const posts = await res.json() as Post[]
  const categories = posts.map(x => x.categories)

  return { categories }
}
