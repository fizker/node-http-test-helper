module.exports = Helper

var request = require('request')
var Q = require('q')
var merge = require('fmerge')

var contentTypes =
    { json: /^application\/json;?/i
    }

function Helper(defaults) {
	this.defaults(defaults)
}

Helper.prototype =
{ get: function get(url, options, callback) { return this.request('get', url, options, callback) }
, post: function post(url, options, callback) { return this.request('post', url, options, callback) }
, put: function(url, options, callback) { return this.request('put', url, options, callback) }
, del: function() { return this.request('del') }
, head: function() { return this.request('head') }
, options: function() { return this.request('options') }
, trace: function() { return this.request('trace') }
, connect: function() { return this.request('connect') }
, request: req
, defaults: defaults
, addDefaults: addDefaults
, scope: scope
}

function scope(opts) {
	return new Helper(this.defaults()).addDefaults(opts)
}

function defaults(opts) {
	if(opts) {
		this._defaults = resolveShorthandDefaults(opts)
		return this
	}
	return this._defaults
}

function addDefaults(opts) {
	this.defaults(merge(this._defaults, opts))
	return this
}

function resolveShorthandDefaults(defaults) {
	if(defaults.jar === true) {
		defaults.jar = request.jar()
	}
	return defaults
}

function req(method, url, options, callback) {
	if(typeof(options) == 'function') {
		callback = options
		options = null
	}
	options = merge(this._defaults, options)
	options.url = this._defaults.url + (url || '')

	if(options && options.accept) {
		options = merge(options, { headers: { 'accept': options.accept } })
		delete options.accept
	}
	if(options && options.body) {
		if(typeof(options.body) == 'string') {
			options = merge(options, { headers: { 'content-type': 'text/plain' } })
		} else {
			options.json = options.body
			delete options.body
		}
	}

	var d = Q.defer()
	request[method](options, d.makeNodeResolver())
	return d.promise.spread(function(response, body) {
		if( contentTypes.json.test(response.headers['content-type'])
		 && typeof(body) == 'string'
		 && body.length
		) {
			try {
				body = JSON.parse(body)
			} catch(e) {
				throw new Error('Invalid JSON: ' + body)
			}
		}
		response.originalBody = response.body
		response.body = body
		return response
	}).nodeify(callback)
}
