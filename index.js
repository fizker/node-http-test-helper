module.exports = Helper

var request = require('request')

function Helper(defaults) {
	this._defaults = defaults
}

Helper.prototype =
{ get: function get() { this.request('get') }
, post: function post() { this.request('post') }
, put: function() { this.request('put') }
, del: function() { this.request('del') }
, head: function() { this.request('head') }
, options: function() { this.request('options') }
, trace: function() { this.request('trace') }
, connect: function() { this.request('connect') }
, request: req
}

function req(method) {
	request[method](this._defaults.url)
}
