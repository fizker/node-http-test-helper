global.chai = require('chai')
chai.should()
global.expect = chai.expect

global.fzkes = require('fzkes')
chai.use(fzkes)
require('finc-chai-helpers').addMethods(chai)

chai.use(require('chai-as-promised'))

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
