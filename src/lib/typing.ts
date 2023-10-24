export interface Post {
	title: string
	slug: string
	description: string
	date: string
	categories: string[]
	published: boolean
}

export interface WebsiteMetadata {
    title?: string
    description?: string
    image?: string
}