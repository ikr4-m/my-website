export interface Post {
	title: string
	slug: string
	description: string
	date: string
	categories: string[]
	published: boolean
}

export type WebsiteNavigator = 'lost' | 'index' | 'porto' | 'blog'

export interface WebsiteMetadata {
    title?: string
    description?: string
    image?: string
	location: WebsiteNavigator
}

export interface HeaderFooterMenu {
	name: string
	link: string
	location?: WebsiteNavigator
}
