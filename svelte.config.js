import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOpetions = {
	extensions: ['.md']
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
