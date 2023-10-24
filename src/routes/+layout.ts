import type { WebsiteMetadata } from "$lib/typing";

export function load() {
    const metadata: WebsiteMetadata = {
        title: '🤔',
        description: 'Lorem ipsum dolor sit amet.',
        image: '/img/b&w.png',
        location: 'lost'
    }

    return { metadata }
}