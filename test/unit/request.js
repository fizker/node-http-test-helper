describe('unit/request.js', function() {
	describe('When creating a new helper', function() {
		var helper
		beforeEach(function() {
			helper = new HttpHelper()
		})
		it('should expose certain `request` methods', function() {
			expect(helper).to.have.property('get').and.be.a('function')
			expect(helper).to.have.property('head').and.be.a('function')
			expect(helper).to.have.property('post').and.be.a('function')
			expect(helper).to.have.property('put').and.be.a('function')
			expect(helper).to.have.property('del').and.be.a('function')
			expect(helper).to.have.property('options').and.be.a('function')
			expect(helper).to.have.property('trace').and.be.a('function')
			expect(helper).to.have.property('connect').and.be.a('function')
		})
	})
	describe('When calling', function() {
		var helper
		beforeEach(function() {
			helper = new HttpHelper({ url: 'http://a.bc:123' })
			fzkes.fake(request, 'get')
			fzkes.fake(request, 'post')
			fzkes.fake(request, 'put')
			fzkes.fake(request, 'del')
			fzkes.fake(request, 'connect')
			fzkes.fake(request, 'options')
			fzkes.fake(request, 'head')
			fzkes.fake(request, 'trace')
		})
		afterEach(function() {
			fzkes.restore()
		})
		describe('`get()`', function() {
			beforeEach(function() {
				helper.get()
			})
			it('should call `request.get` with the default url', function() {
				expect(request.get).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`post()`', function() {
			beforeEach(function() {
				helper.post()
			})
			it('should call `request.post` with the default url', function() {
				expect(request.post).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`trace()`', function() {
			beforeEach(function() {
				helper.trace()
			})
			it('should call `request.trace` with the default url', function() {
				expect(request.trace).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`head()`', function() {
			beforeEach(function() {
				helper.head()
			})
			it('should call `request.head` with the default url', function() {
				expect(request.head).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`options()`', function() {
			beforeEach(function() {
				helper.options()
			})
			it('should call `request.options` with the default url', function() {
				expect(request.options).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`del()`', function() {
			beforeEach(function() {
				helper.del()
			})
			it('should call `request.del` with the default url', function() {
				expect(request.del).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`put()`', function() {
			beforeEach(function() {
				helper.put()
			})
			it('should call `request.put` with the default url', function() {
				expect(request.put).to.have.been.calledWith('http://a.bc:123')
			})
		})
		describe('`connect()`', function() {
			beforeEach(function() {
				helper.connect()
			})
			it('should call `request.connect` with the default url', function() {
				expect(request.connect).to.have.been.calledWith('http://a.bc:123')
			})
		})
	})
})
