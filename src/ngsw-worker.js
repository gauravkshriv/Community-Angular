importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});

// *eslint no-unused-vars: "off"

const _self= self;

/**
 * Route to check for matching requests
 *
 * @extends {Map}
 */
class SWRoute extends Map {

	constructor(route, config, ...controllers) {
		super();

		this.set('route', route);
		this.set('config', config);
		this.set('controllers', controllers);
	}


	/**
	 * Checks if a request matches this route
	 * 
	 * @param  {Request}  request  The request made
	 * 
	 * @return {boolean}           True if the request matches
	 */
	match(request) {

		const route= this.get('route');
		const config= this.get('config');

		// Request method check
		if('method' in config) {
			if(request.method.toLowerCase() !== config.method.toLowerCase())
				return false;
		}

		// Request url check
		if(typeof route === 'string') {
			return request.url.endsWith(route);  // For strings
		} else if('test' in route) {
			return route.test(request.url);      // For regular expressions
		}

		return false;
	}
}



/**
 * Service worker JS
 */
class ServiceWorkerJS {

	constructor() {

		// All the routes with no cache name will be stored in this
		this.DEFAULT_CACHE_NAME= 'cache-default-swjs';

		this._routes= [];
		this._precacheList= [];

		this._onPushHandler= this._onPushHandler.bind(this);

		// Attach event handlers
		_self.addEventListener('fetch', this._onFetchHandler.bind(this));
		_self.addEventListener('install', this._onInstallHandler.bind(this));
	}


	/**
	 * Push notification callback setter
	 * 
	 * @param  {Function} callback
	 */
	set onPushNotification(callback) {

		// Remove and add the handler(Dont wanna leak and shit)
		_self.removeEventListener('push', this._onPushHandler);
		_self.addEventListener('push', this._onPushHandler);

		this._pushCallback= callback;
	}




	/**
	 * Add files precaching
	 * 
	 * @param  {string}  cacheName     Name of the cache to store it in
	 * @param  {List}    precacheList  List of file names
	 */
	precache(cacheName, precacheList) {

		this._precacheList.push({
			cacheName,
			files: precacheList
		});
	}


	/**
	 * Adds a route for fetch
	 * 
	 * @param {String|RegExp|SWRoute}  route       The route
	 * @param {object|null}            config      Configuration for the router
	 * @param {...Function|null}       controllers The controllers(@param event. @return {Response})
	 */
	addRoute(route, config, ...controllers) {

		// If SWRoute is passed directly
		if(route.constructor === SWRoute)
			this._routes.push(route);
		else
			this._routes.push(new SWRoute(route, config, ...controllers));
	}



	/**
	 * Push event handler
	 * 
	 * @param  {Event} event
	 */
	_onPushHandler(event) {

		// Callback check
		if(typeof this._pushCallback !== 'function')
			return;

		// Execute the callback
		const notificationPromise= this._pushCallback(event);

		// Promise check
		if(typeof notificationPromise.then !== 'function')
			return;

		event.waitUntil(

			// The promise resolves to the notification
			notificationPromise
				.then(notific => 

					// Show the notification
					self.registration
						.showNotification(
							notific.title,
							notific.options
						)
				)
		);
	}



	/**
	 * Install event handler
	 * 
	 * @param  {InstallEvent} event
	 */
	_onInstallHandler(event) {

		event.waitUntil(

			// Wait to add all the caches
			Promise.all(

				// for all the caches
				this._precacheList
					.map(preCache => 
						caches
							.open(preCache.cacheName)
							.then(cache => cache.addAll(preCache.files))
					)
			)
		);
	}



	/**
	 * Fetch event handler
	 * 
	 * @param  {FetchEvent}  event  The fetch event made by the browser
	 */
	_onFetchHandler(event) {

		// Response promise
		let response_P= null;

		// For each route
		this._routes
			// Get the ones that match the request made
			.filter(route => route.match(event.request))
			.forEach(route =>
				route
					.get('controllers')
					// If its a function, let it through
					.filter(ctrlr => typeof ctrlr === 'function')
					.forEach(ctrlr => {

						// If its a promise, call controller after it resolves
						if(response_P && 'then' in response_P) {
							response_P= response_P.then(() => ctrlr(event));

						// Else just call the controller
						} else {
							response_P= ctrlr(event);
						}
					})
			);


		// If the response is a promise, respond with it
		if(response_P && 'then' in response_P) {
			event.respondWith(response_P);
		}
	}


	/**
	 * Fetches and caches the response
	 * 
	 * @param  {Request}   request
	 * @param  {string}    cacheName  The name of the cache to put the response in
	 * @return {Response}             Response promise
	 */
	fetch(request, cacheName=this.DEFAULT_CACHE_NAME) {

		// Make a fetch request
		return fetch(request)
			.then(resp => 
				caches
					.open(cacheName)
					.then(cache => {

						// Cache the response
						cache.put(request, resp.clone());

						return resp;
					})
			)
			.catch(e => console.error(e));
	}


	/**
	 * Search in the cache for a request
	 * 
	 * @param  {Request} request
	 * 
	 * @return {Response}
	 */
	searchCache(request) {
		return caches
			.match(request)
			.catch(e => console.error(e));
	}


	/**
	 * Absorbs the error in a promise
	 * 
	 * @param  {Promise} promise
	 * 
	 * @return {Promise}
	 */
	_absorbError(promise) {

		return new Promise((resolve, reject) => {
			promise
				.then(resolve)
				.catch(() => null);
		});
	}








	// ##############  RECIPIES  ##################


	/**
	 * Race (network and cache) recipe
	 * 
	 * @param  {Object} config
	 * 
	 * @return {Function}
	 */
	race(config) {

		// Cache only with errors absorbed
		const cacheOnly= e => this._absorbError(this.cacheOnly(config)(e));
		// Network only with errors absorbed
		const networkOnly= e => this._absorbError(this.networkOnly(config)(e));

		// Race the two
		return e => Promise.race([ cacheOnly(e), networkOnly(e) ]);
	}


	/**
	 * Cache first recipe
	 * 
	 * @param  {Object}   config  Configuration object
	 * 
	 * @return {Function}         Fn that returns a promise
	 */
	cacheFirst(config) {

		return e => 
			this
				// Look in the cache
				.searchCache(e.request)
				// Respond with the cache or fetch and then cache
				.then(response => response || this.fetch(e.request, config.cache));
	}



	/**
	 * Network first recipe
	 * 
	 * @param  {Object}  config
	 * 
	 * @return {Function}
	 */
	networkFirst(config) {

		return e => 
			this
				// Fetch
				.fetch(e.request, config.cache)
				// Absorb error
				.catch(e => {})
				// Respond with the response or look in the cache
				.then(response => response || this.searchCache(e.request));
	}



	/**
	 * Cache only recipe
	 * 
	 * @param  {Object} config
	 * 
	 * @return {Function}
	 */
	cacheOnly(config) {

		return e => 
			this
				// Look for it in the cache
				.searchCache(e.request)
				.then(response =>
					// If it wasnt found, either return a default response or an error 
					response || (
						(config.default)?
							config.default: 
							Promise.reject(new Error('Cache not found'))
					)
				);
	}



	/**
	 * Network only recipe
	 * 
	 * @param  {Object}    config
	 * 
	 * @return {Function}
	 */
	networkOnly(config) {

		return e => new Promise((resolve, reject) => {

			// Network request timeout check
			setTimeout(() => reject(new Error('Request timeout')), config.timeout || 10000);

			// Make the request
			fetch(e.request)
				.then(resolve)
				.catch(reject);
		});
	}
}


// 

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const VERSION = 'v8308';
const CACHE_NAME = 'cache_' + VERSION;

// A list of local resources we always want to be cached.
const PREFETCH_URLS = [
  '/assets/css/styles.min.css',
  '/assets/js/index.min.js',
  '/assets/SVGSpriteSheet.svg',
  '/assets/fonts/Lato-Light.woff2',
  '/assets/fonts/Lato-Regular.woff2',
  '/assets/fonts/Lato-Bold.woff2',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PREFETCH_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => cacheName !== CACHE_NAME);
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip HTML documents, since the can be dynamic.
  if (event.request.headers.get('Accept').includes('text/html')) {
    return;
  }

  // Skip cross-origin requests, like those for Google Analytics.
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Only handle GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // Only cache path with a dot (files), and not endpoints.
  const path = event.request.url.replace(self.location.origin, '');
  if (path.indexOf('.') === -1) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          // Put a copy of the response in the runtime cache.
          return cache
            .put(event.request, response.clone())
            .then(() => response)
            .catch(() => response)
          ;
        });
      });
    })
  );
});