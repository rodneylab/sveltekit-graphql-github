/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: [
		preprocess({
			scss: {
				prependData: "@import 'src/lib/styles/variables.scss';"
			}
		})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

// might be needed if you connect through a proxy server
// delete process.env.https_proxy;
// delete process.env.HTTPS_PROXY;
// delete process.env.http_proxy;
// delete process.env.HTTP_PROXY;
// delete process.env._proxy;

export default config;
