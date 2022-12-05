import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$css: path.resolve('./src/lib/css'),
			$helper: path.resolve('./src/lib/helperFiles')
		}
	}
};

export default config;
