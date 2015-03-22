#!/usr/bin/env node

var config = require('./config')();
var prerender = require('./lib');

var server = prerender({
	workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
	iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
	phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
	messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});

if (config.auth) {
	server.use(prerender.basicAuth());
}
if (config.logger) {
	server.use(prerender.basicAuth());
}
server.use(prerender.blacklist());
server.use(prerender.removeScriptTags());

server.use(prerender.httpHeaders());
if (config.s3HtmlCache) {
	prerender.s3HtmlCache();
} else if (config.redis) {
	server.use(require('prerender-redis-cache'));
} else {
	server.use(prerender.inMemoryHtmlCache());
}

server.start();
