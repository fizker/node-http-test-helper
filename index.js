module.exports = Helper

var request = require('request')
var Q = require('q')

function Helper(defaults) {
	this._defaults = defaults
}

Helper.prototype =
{ get: function get() { return this.request('get') }
, post: function post() { return this.request('post') }
, put: function() { return this.request('put') }
, del: function() { return this.request('del') }
, head: function() { return this.request('head') }
, options: function() { return this.request('options') }
, trace: function() { return this.request('trace') }
, connect: function() { return this.request('connect') }
, request: req
}

function req(method) {
	var d = Q.defer()
	request[method](this._defaults.url)
	return d.promise
}
