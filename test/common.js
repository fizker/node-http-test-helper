require('mocha-as-promised')()

global.chai = require('chai')
chai.should()
global.expect = chai.expect
chai.use(require('chai-as-promised'))

global.helpers = require('./helpers')
