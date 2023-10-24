import { error } from '@sveltejs/kit'
import type { Post } from "$lib/typing"
import Paging from '$lib/utils/paging'

export async function load({ params, fetch }) {
  const category = params.category as string
  const res = await fetch('/blog/pages')
  const catePosts = (await res.json() as Post[]).filter(x => x.categories.includes(category));
  const maxPost = 20
  if (catePosts.length === 0) throw error(404);

  return { posts: Paging(catePosts, maxPost), category }
}