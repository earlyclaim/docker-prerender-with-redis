var defaultConfig = function () {
	return {
		logger: false,
		auth: false,
		s3HtmlCache: false,
		redis: false
	};
};

exports = module.exports = function () {
	var config = defaultConfig();
	var env = {};
	[
		'PRERENDER_LOGGER',
		'BASIC_AUTH_USERNAME',
		'BASIC_AUTH_PASSWORD',
		'AWS_ACCESS_KEY_ID',
		'AWS_SECRET_ACCESS_KEY',
		'S3_BUCKET_NAME',
		'REDISTOGO_URL',
		'REDISCLOUD_URL',
		'REDISGREEN_URL',
		'REDIS_URL'
	].forEach(function (val) {
		env[val] = (process.env[val]) ? process.env[val].toString().toLowerCase() : 'false';
	});
	if (env.PRERENDER_LOGGER !== 'false') {
		config.logger = true;
	}
	if ((env.BASIC_AUTH_USERNAME !== 'false') && (env.BASIC_AUTH_PASSWORD !== 'false')) {
		config.auth = true;
	}
	if ((env.AWS_ACCESS_KEY_ID !== 'false') && (env.AWS_SECRET_ACCESS_KEY !== 'false') && (env.S3_BUCKET_NAME !== 'false')) {
		config.s3HtmlCache = true;
	}
	if ((env.REDISTOGO_URL !== 'false') || (env.REDISCLOUD_URL !== 'false') || (env.REDISGREEN_URL !== 'false') || (env.REDIS_URL !== 'false')) {
		config.redis = true;
	}

	if (config.logger) {
		console.log("Configuration active", config);
		console.log("Environment", env);
	}
	return config;
};
