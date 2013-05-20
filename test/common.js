require('mocha-as-promised')()

global.request = require('request')

global.chai = require('chai')
chai.should()
global.expect = chai.expect
chai.use(require('chai-as-promised'))

global.fzkes = require('fzkes')
chai.use(fzkes.chai)

global.nock = require('nock')

global.helpers = require('./helpers')

// The subject of the tests
global.HttpHelper = require('../index')
