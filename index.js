module.exports = Helper

var request = require('request')
var Q = require('q')

function Helper(defaults) {
	this._defaults = defaults
}

Helper.prototype =
{ get: function get(url, options) { return this.request('get', url, options) }
, post: function post(url, options) { return this.request('post', url, options) }
, put: function(url, options) { return this.request('put', url, options) }
, del: function() { return this.request('del') }
, head: function() { return this.request('head') }
, options: function() { return this.request('options') }
, trace: function() { return this.request('trace') }
, connect: function() { return this.request('connect') }
, request: req
}

function req(method, url, options) {
	if(options && options.accept) {
		options.headers = { 'accept': options.accept }
		delete options.accept
	}
	if(options && options.body) {
		if(typeof(options.body) == 'string') {
			options.headers = { 'content-type': 'text/plain' }
		} else {
			options.json = options.body
			delete options.body
		}
	}

	var d = Q.defer()
	request[method](this._defaults.url + (url || ''), options, d.makeNodeResolver())
	return d.promise.then(function(args) {
		var response = args[0]
		var body = args[1]
		if( response.headers['content-type'] == 'application/json'
		 && typeof(body) == 'string'
		) {
			body = JSON.parse(body)
		}
		return [ response, body ]
	})
}
