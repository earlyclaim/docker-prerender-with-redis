Prerender Service
===========================

Google, Facebook, Twitter, Yahoo, and Bing are constantly trying to view your website... but they don't execute javascript. That's why we built Prerender. Prerender is perfect for AngularJS SEO, BackboneJS SEO, EmberJS SEO, and any other javascript framework.

Behind the scenes, Prerender is a node server from [prerender.io](http://prerender.io) that uses phantomjs to create static HTML out of a javascript page.

 [Earlyclaim.com](http://earlyclaim.com) put the prerender.io Service in a container, [read the blog post](http://wp.me/p5V1if-1N) to know why.

It should be used in conjunction with [these middleware libraries](#middleware) to serve the prerendered HTML to crawlers for SEO. Get started in two lines of code using [Rails](https://github.com/prerender/prerender_rails) or [Node](https://github.com/prerender/prerender-node).

Prerender adheres to google's `_escaped_fragment_` proposal, which we recommend you use. It's easy:
- Just add &lt;meta name="fragment" content="!"> to the &lt;head> of all of your pages
- If you use hash urls (#), change them to the hash-bang (#!)
- That's it! Perfect SEO on javascript pages.

Prerender includes lots of plugins, for example using Amazon S3 to [cache your prerendered HTML](#s3-html-cache).  
Prerender also starts multiple phantomjs processes to maximize throughput.



## Middleware

This is a list of middleware available to use with the prerender service:

#### Official middleware

###### Javascript
* [prerender-node](https://github.com/prerender/prerender-node) (Express)

###### Ruby
* [prerender_rails](https://github.com/prerender/prerender_rails) (Rails)

###### Apache
* [.htaccess](https://gist.github.com/thoop/8072354)

###### Nginx
* [nginx.conf](https://gist.github.com/thoop/8165802)

#### Community middleware

###### PHP
* [zfr-prerender](https://github.com/zf-fr/zfr-prerender) (Zend Framework 2)
* [YuccaPrerenderBundle](https://github.com/rjanot/YuccaPrerenderBundle) (Symfony 2)
* [Laravel Prerender](https://github.com/JeroenNoten/Laravel-Prerender) (Laravel)

###### Java
* [prerender-java](https://github.com/greengerong/prerender-java)

###### Grails
* [grails-prerender](https://github.com/tuler/grails-prerender)

###### Nginx
* [Reverse Proxy Example](https://gist.github.com/Stanback/6998085)

###### Apache
* [.htaccess](https://gist.github.com/Stanback/7028309)

Request more middleware for a different framework in this [issue](https://github.com/prerender/prerender/issues/12).



## How it works
This is a simple service that only takes a url and returns the rendered HTML (with all script tags removed).

Note: you should proxy the request through your server (using middleware) so that any relative links to CSS/images/etc still work.

`GET` http://<your container ip>:<your container port>/https://www.google.com

`GET` http://<your container ip>:<your container port>/https://www.google.com/search?q=angular

## Redis
You can enable the Redis feature by setting the `REDISTOGO_URL`, `REDISCLOUD_URL`, `REDISGREEN_URL` or `REDIS_URL` (in the format redis://user:password@host:port). This currently covers all heroku add-ons for Redis to support quick start.


### s3HtmlCache

A `GET` request will check S3 for a cached copy. If a cached copy is found, it will return that. Otherwise, it will make the request to your server and then persist the HTML to the S3 cache.

A `POST` request will skip the S3 cache. It will make a request to your server and then persist the HTML to the S3 cache. The `POST` is meant to update the cache.

You'll need to sign up with Amazon Web Services and export these 3 environment variables.

```
$ export AWS_ACCESS_KEY_ID=<aws access key>
$ export AWS_SECRET_ACCESS_KEY=<aws secret access key>
$ export S3_BUCKET_NAME=<bucket name>
```

Warning! Your keys should be kept private and you'll be charged for all files uploaded to S3.

#### Region support

By default, s3HtmlCache works with the US Standard region (East), if your bucket is localized in another region you can config it with an environment variable : `AWS_REGION`.

```
$ export AWS_REGION=<region name>
```

For example :

```
$ export AWS_REGION=eu-west-1
```
## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
