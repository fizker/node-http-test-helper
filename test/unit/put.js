describe('unit/put.js', function() {
	var helper
	var server
	helpers.setup.unit(this)
	beforeEach(function() {
		helper = new HttpHelper({ url: 'http://a.bc:123' })
		server = nock('http://a.bc:123')
	})
	describe('When getting', function() {
		var serverScope
		describe('with a callback', function() {
			var callback
			var returnValue
			beforeEach(function() {
				callback = fzkes.fake('callback')
				serverScope = server
					.put('/')
					.reply(204)
			})
			describe('as the second parameter', function() {
				beforeEach(function() {
					returnValue = helper.put('/', callback)
				})
				it('should not return anything', function() {
					expect(returnValue).to.be.undefined
				})
				it('should call the callback eventually', function(done) {
					callback.calls(done)
				})
			})
			describe('as the third parameter', function() {
				beforeEach(function() {
					returnValue = helper.put('/', {}, callback)
				})
				it('should not return anything', function() {
					expect(returnValue).to.be.undefined
				})
				it('should call the callback eventually', function(done) {
					callback.calls(done)
				})
			})
		})
	})
	describe('When putting `/def`', function() {
		var serverScope
		describe('with `json` set on options', function() {
			beforeEach(function() {
				serverScope = server
					.matchHeader('content-type', 'application/json')
					.put('/def', { abc: 123 })
					.reply(204)
			})
			it('should pass body as `content-type: json`', function() {
				return helper.put('/def', { json: { abc: 123 } })
					.then(function() {
						expect(serverScope.isDone()).to.be.true
					})
			})
		})
		describe('with `body` set to a string', function() {
			beforeEach(function() {
				serverScope = server
					.matchHeader('content-type', /^text\/plain/)
					.put('/def', 'abc')
					.reply(204)
			})
			it('should default `content-type` to text/plain', function() {
				return helper.put('/def', { body: 'abc' })
					.then(function() {
						expect(serverScope.isDone()).to.be.true
					})
			})
		})
		describe('with `body` set to an object', function() {
			beforeEach(function() {
				serverScope = server
					.matchHeader('content-type', 'application/json')
					.put('/def', { abc: 123 })
					.reply(204)
			})
			it('should default `content-type` to application/json', function() {
				return helper.put('/def', { body: { abc: 123 } })
					.then(function() {
						expect(serverScope.isDone()).to.be.true
					})
			})
		})
	})
})
