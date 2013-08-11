// These tests massage the test-server used to validate the actual code
xdescribe('integration/test-server.js', function() {
	var Q = require('q')
	var request = Q.nfbind(require('request'))
	helpers.setup.integration(this)
	describe('When registering a get', function() {
		beforeEach(function() {
			helpers.server.get('/abc', function(req, res) {
				res.send('success')
			})
		})
		it('should respond to the get', function() {
			return request('http://localhost:' + helpers.PORT + '/abc')
				.get(1)
				.should.eventually.equal('success')
		})
	})
	describe('When registering in a sub-describe', function() {
		describe('the first describe', function() {
			beforeEach(function() {
				helpers.server.get('/abc', function(req, res) {
					res.send('first')
				})
			})
			it('should return the expected here', function() {
				return request('http://localhost:' + helpers.PORT + '/abc')
					.get(1)
					.should.eventually.equal('first')
			})
		})
		describe('the second describe', function() {
			beforeEach(function() {
				helpers.server.get('/abc', function(req, res) {
					res.send('second')
				})
			})
			it('should return the expected here', function() {
				return request('http://localhost:' + helpers.PORT + '/abc')
					.get(1)
					.should.eventually.equal('second')
			})
		})
	})
})
