import adapter from '@sveltejs/adapter-auto'
import Shiki from 'shiki'
import { escapeSvelte, mdsvex } from 'mdsvex'
import RemarkToc from 'remark-toc'
import RehypeSlug from 'rehype-slug'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOpetions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await Shiki.getHighlighter({ theme: 'nord' })
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
			return `{@html \`${html}\`}`
		}
	},
	remarkPlugins: [ RemarkToc ],
	rehypePlugins: [ RehypeSlug ]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [ vitePreprocess(), mdsvex(mdsvexOpetions) ],
	kit: {
		adapter: adapter()
	}
};

export default config;
