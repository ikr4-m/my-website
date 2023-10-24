export async function load({ parent }) {
    const metadata = (await parent()).metadata
    metadata.title = '~ikr4m'
    metadata.description = 'My "beloved" website.'
    metadata.location = 'index'

    return { metadata }
}