import type { Post } from "$lib/typing"

export default function (posts: Post[], maxPost: number): Post[][] {
    const ret: Post[][] = [[]]
    posts.forEach((post, index) => {
        if ((index + 1) % maxPost === 0) ret.push([])
        ret[ret.length - 1].push(post)
    })

    return ret
}