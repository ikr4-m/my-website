import { error } from '@sveltejs/kit'
import type { Post } from '../../../app.js'

export async function load({ params }) {
  const slug = params.slug as string

  try {
    const post = await import(`../../../pages/${slug}.md`)
    return {
      content: post.default,
      metadata: post.metadata as Post
    }
  } catch (e) {
    throw error(404)
  }
}