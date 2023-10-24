import { error } from '@sveltejs/kit'
import type { Post } from "$lib/typing"

export async function load({ params, fetch }) {
  const category = params.category as string
  const res = await fetch('/blog/pages')
  const posts = (await res.json() as Post[]).filter(x => x.categories.includes(category));
  if (posts.length === 0) throw error(404);

  return { posts, category }
}