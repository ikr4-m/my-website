import type { WebsiteMetadata, WebsiteNavigator } from "$lib/typing";

export function load() {
    const metadata: WebsiteMetadata = {
        title: '🤔',
        description: 'Lorem ipsum dolor sit amet.',
        image: '/img/b&w.png'
    }

    const navigator: WebsiteNavigator = 'lost'

    return { metadata, navigator }
}