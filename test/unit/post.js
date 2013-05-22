describe('unit/post.js', function() {
	var helper
	var server
	helpers.setup.unit(this)
	beforeEach(function() {
		helper = new HttpHelper({ url: 'http://a.bc:123' })
		server = nock('http://a.bc:123')
	})
	describe('When posting to `/def`', function() {
		var promise
		describe('with `json` set on options', function() {
			beforeEach(function() {
				server
					.matchHeader('content-type', 'application/json')
					.post('/def', { abc: 123 })
					.reply(204)
			})
			it('should pass body as `content-type: json`', function() {
				promise = helper.post('/def', { json: { abc: 123 } })
				return promise.then(function() {
					expect(server.isDone()).to.be.true
				})
			})
		})
		describe('with `form` set on options', function() {
			beforeEach(function() {
				server
					// We don't care about charset of the content-type (request
					// puts this on), so we use a more relaxed regex
					.matchHeader('content-type',
						/^application\/x-www-form-urlencoded/)
					.post('/def', { abc: 123 })
					.reply(204)
			})
			it('should pass body as content-type: form-urlencoded', function() {
				promise = helper.post('/def', { form: { abc: 123 } })
				return promise.then(function() {
					expect(server.isDone()).to.be.true
				})
			})
		})
		describe('and content is returned', function() {
			beforeEach(function() {
				server
					.post('/def')
					.reply(200, '{ "abc": 123 }',
						{ 'content-type': 'application/json' })
				promise = helper.post('/def', { json: { def: 456 } })
				return promise
			})
			it('should have the response object', function() {
				return promise.should.eventually
					.approximate([ { statusCode: 200 } ])
			})
			it('should parse the body appropriately', function() {
				return promise.should.eventually
					.approximate([ {}, { abc: 123 } ])
			})
		})
	})
})
