import type { Post } from "$lib/typing"

export async function load({ fetch }) {
  const res = await fetch('/blog/pages')
  const posts = (await res.json() as Post[])
    .slice(0, 5)
    .map(x => {
      return { ...x, title: x.title.length > 13 ? `${x.title.slice(0, 10)}...`: x.title }
    })

  return { posts }
}
