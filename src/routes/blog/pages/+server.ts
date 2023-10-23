import { json } from '@sveltejs/kit'
import type { Post } from '../../../app'

export async function GET() {
  const posts: Post[] = []
  const paths = import.meta.glob('/src/pages/**/**.md', { eager: true })

  Object.keys(paths).forEach(path => {
    const file = paths[path] 

    if (!file) return
    if (typeof file !== 'object') return
    if ('metadata' in file === false) return

    const metadata = (file as Record<string, any>).metadata as Omit<Post, 'slug'>
    const slug = path.split('/').slice(3).join('/').slice(0, -3)
    const post = { ...metadata, slug } as Post

    if (!post.published) return
    posts.push(post)
  })

  return json(posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()))
}
