describe('unit/get.js', function() {
	var helper
	var server
	helpers.setup.unit(this)
	beforeEach(function() {
		helper = new HttpHelper({ url: 'http://a.bc:123' })
		server = nock('http://a.bc:123')
	})
	describe('When getting', function() {
		var serverScope
		describe('and setting `accept` option', function() {
			beforeEach(function() {
				serverScope = server
					.matchHeader('accept', 'text/plain')
					.get('/')
					.reply(204)
			})
			it('should send that as the accept-header', function() {
				return helper.get('/', { accept: 'text/plain' })
					.then(function() {
						expect(serverScope.isDone()).to.be.true
					})
			})
		})
	})
	describe('When getting `/def` returns 2xx and a json body', function() {
		var promise
		beforeEach(function() {
			server.get('/def').reply(200, '{ "abc": 123 }', { 'content-type': 'application/json' })
			promise = helper.get('/def')
		})
		it('should resolve the promise', function() {
			return promise.should.become.fulfilled
		})
		it('should have the response object', function() {
			return promise.should.eventually
				.approximate([ { statusCode: 200, body: '{ "abc": 123 }' } ])
		})
		it('should pass a transformed body as well', function() {
			return promise.should.eventually
				.approximate([ {}, { abc: 123 } ])
		})
		describe('with `charset` on the content-type', function() {
			beforeEach(function() {
				server.get('/ghi')
					.reply(200, '{ "abc": 123 }', { 'content-type': 'application/json; charset=utf-8' })
				promise = helper.get('/ghi')
			})
			it('should still pass a transformed body', function() {
				return promise.should.eventually
					.approximate([ {}, { abc: 123 } ])
			})
		})
	})
})
