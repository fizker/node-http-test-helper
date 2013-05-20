describe('unit/post.js', function() {
	var helper
	var server
	helpers.setup.unit(this)
	beforeEach(function() {
		helper = new HttpHelper({ url: 'http://a.bc:123' })
		server = nock('http://a.bc:123')
	})
	describe('When posting `/def`', function() {
		var promise
		describe('with `json` set on options', function() {
			var serverScope
			beforeEach(function() {
				serverScope = server
					.matchHeader('content-type', 'application/json')
					.post('/def')
					.reply(204)
				promise = helper.post('/def', { json: { abc: 123 } })
				return promise
			})
			it('should have the response object', function() {
				return promise.should.eventually
					.approximate([ { statusCode: 204 } ])
			})
			it('should pass body as `content-type: json`', function() {
				return promise.then(function() {
					expect(serverScope.isDone()).to.be.true
				})
			})
		})
	})
})
