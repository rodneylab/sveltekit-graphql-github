// based on https://github.com/tretapey/svelte-pwa/blob/master/public/service-worker.js
import { build, files, version } from '$service-worker';

const CACHE_NAME = `static-cache-${version}`;
const to_cache = build.concat(files);

// @ts-check
/// <reference no-default-lib="false"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Using IIFE to provide closure to redefine `self`
(() => {
	// This is a little messy, but necessary to force type assertion
	// Same issue as in TS -> https://github.com/microsoft/TypeScript/issues/14877
	// prettier-ignore
	const self =
    /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (globalThis
      .self));
	self.addEventListener('install', () => {
		console.log('[ServiceWorker] Install');

		self.waitUntil(
			caches.open(CACHE_NAME).then((cache) => {
				console.log('[ServiceWorker] Pre-caching offline page');
				return cache.addAll(to_cache).then(() => {
					self.skipWaiting();
				});
			}),
		);
	});

	self.addEventListener('activate', (event) => {
		console.log('[ServiceWorker] Activate');
		// Remove previous cached data from disk
		event.waitUntil(
			caches.keys().then(async (keys) =>
				Promise.all(
					keys.map((key) => {
						if (key !== CACHE_NAME) {
							console.log('[ServiceWorker] Removing old cache', key);
							return caches.delete(key);
						}
					}),
				),
			),
		);
		self.clients.claim();
	});

	self.addEventListener('fetch', (event) => {
		console.log('[ServiceWorker] Fetch', event.request.url);
		if (event.request.mode !== 'navigate') {
			return;
		}
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.open(CACHE_NAME).then((cache) => {
					return cache.match('offline.html');
				});
			}),
		);
	});
})();
