// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$comp: path.resolve('./src/lib/components'),
			$css: path.resolve('./src/lib/css'),
			$helper: path.resolve('./src/lib/helperFiles'),
			$api: path.resolve('./src/routes/api'),
			$auth: path.resolve('./src/routes/auth')
		}
	}
	// ssr: {
	//     noExternal: ['devalue'],
	// },
};

export default config;
