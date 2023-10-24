import type { WebsiteMetadata } from "$lib/typing"
import { writable as Writable } from "svelte/store"

export default Writable<WebsiteMetadata>({
    title: '🤔',
    description: 'Lorem ipsum dolor sit amet.',
    image: '/img/b&w.png',
    location: 'lost'
})