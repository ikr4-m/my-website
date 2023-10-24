import type { Post } from "$lib/typing"

export async function load({ fetch }) {
  const res = await fetch('/blog/pages')
  const posts = await res.json() as Post[]
  const categories: string[] = []

  posts.forEach(post => {
    post.categories.forEach(v => !categories.includes(v) && categories.push(v))
  })
  return { categories }
}
