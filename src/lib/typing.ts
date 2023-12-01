export interface Post {
	title: string
	slug: string
	description: string
	date: string
	last_updated?: string
	categories: string[]
	published: boolean
	thumbnail?: string
}

export type WebsiteNavigator = 'lost' | 'index' | 'blog' | 'categories'

export interface WebsiteMetadata {
    title: string
    description: string
	location: WebsiteNavigator
}

export interface HeaderFooterMenu {
	name: string
	link: string
	location?: WebsiteNavigator
}
