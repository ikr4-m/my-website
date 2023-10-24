import type { WebsiteNavigator } from '$lib/typing.js'

export async function load({ parent }) {
    const metadata = (await parent()).metadata
    metadata.title = 'Index'

    const navigator: WebsiteNavigator = 'index'

    return { metadata, navigator }
}