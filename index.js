module.exports = Helper

var request = require('request')
var Q = require('q')

function Helper(defaults) {
	this._defaults = defaults
}

Helper.prototype =
{ get: function get(url) { return this.request('get', url) }
, post: function post(url, options) { return this.request('post', url, options) }
, put: function() { return this.request('put') }
, del: function() { return this.request('del') }
, head: function() { return this.request('head') }
, options: function() { return this.request('options') }
, trace: function() { return this.request('trace') }
, connect: function() { return this.request('connect') }
, request: req
}

function req(method, url, options) {
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
