describe('unit/delete.js', function() {
	var helper
	var server
	helpers.setup.unit(this)
	beforeEach(function() {
		helper = new HttpHelper({ url: 'http://a.bc:123' })
		server = nock('http://a.bc:123')
	})
	describe('When deleting', function() {
		var serverScope
		describe('with a callback', function() {
			var callback
			var returnValue
			beforeEach(function() {
				callback = fzkes.fake('callback')
				serverScope = server
					.delete('/')
					.reply(204)
			})
			describe('as the second parameter', function() {
				beforeEach(function() {
					returnValue = helper.delete('/', callback)
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
					returnValue = helper.delete('/', {}, callback)
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
	describe('When deleting `/def`', function() {
		var serverScope
		describe('with `accept` set on options', function() {
			beforeEach(function() {
				serverScope = server
					.matchHeader('Accept', 'application/json')
					.delete('/def')
					.reply(204)
			})
			it('should set the header correctly', function() {
				return helper.delete('/def', { accept: 'application/json' })
					.then(function() {
						expect(serverScope.isDone()).to.be.true
					})
			})
		})
	})
	describe('When using the `del` shorthand', function() {
		var serverScope
		var request
		beforeEach(function() {
			serverScope = server
				.matchHeader('Accept', 'application/json')
				.delete('/def')
				.reply(204)
			request = helper.del('/def', { accept: 'application/json' })
			return request
		})
		it('should still work', function() {
			expect(serverScope.isDone()).to.be.true
		})
	})
})
