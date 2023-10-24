import type { WebsiteMetadata } from "$lib/typing"
import { writable as Writable } from "svelte/store"

export default Writable<WebsiteMetadata>({
    title: '~ikram',
    description: 'My "beloved" website',
    location: 'lost'
})