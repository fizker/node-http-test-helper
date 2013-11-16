require('mocha-as-promised')()

global.chai = require('chai')
chai.should()
global.expect = chai.expect
chai.use(require('chai-as-promised'))

global.fzkes = require('fzkes')
chai.use(fzkes)
require('finc-chai-helpers').addMethods(chai)


var request = require('request')
var fakeRequest = global.request = fzkes.fake('request').calls(request)
Object.keys(request).forEach(function(key) {
	fakeRequest[key] = request[key]
})
require.cache[require.resolve('request')].exports = global.request

global.nock = require('nock')

global.helpers = require('./helpers')

// The subject of the tests
global.HttpHelper = require('../index')
