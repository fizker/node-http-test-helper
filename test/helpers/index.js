module.exports =
{ setup:
  { integration: setupIntegration
  }
, PORT: 8082
}

var http = require('http')
var express = require('express')
var Q = require('q')

function setupIntegration(mocha) {
	mocha.beforeEach(function() {
		module.exports.server = new Server()
		return module.exports.server.listen(8082)
	})
	mocha.afterEach(function() {
		return module.exports.server.close()
	})
}

function Server() {
	this._app = express()
	this._server = http.createServer(this._app)
	this.get = this._app.get.bind(this._app)
	this.post = this._app.post.bind(this._app)
	this.put = this._app.put.bind(this._app)
	this.del = this._app.del.bind(this._app)
}

Server.prototype.listen = function listen(port) {
	return Q.ninvoke(this._server, 'listen', port)
}
Server.prototype.close = function close() {
	return Q.ninvoke(this._server, 'close')
}
