describe('unit/defaults.js', function() {
	var request = require('request')
	var helper

	describe('When calling `scope()`', function() {
		var scope
		beforeEach(function() {
			helper = new HttpHelper({ a: 1, headers: { b: 2 } })
		})
		describe('with no parameters', function() {
			beforeEach(function() {
				scope = helper.scope()
			})
			it('should return a new helper', function() {
				expect(scope).not.to.equal(helper)
			})
			it('should have the same defaults', function() {
				expect(scope.defaults()).to.deep.equal(helper.defaults())
			})
		})
		describe('with defaults', function() {
			beforeEach(function() {
				scope = helper.scope({ c: 3, headers: { d: 4 } })
			})
			it('should still have the old defaults', function() {
				expect(scope.defaults()).to.approximate(helper.defaults())
			})
			it('should also have the new defaults', function() {
				expect(scope.defaults())
					.to.approximate({ c: 3, headers: { d: 4 } })
			})
		})
	})

	describe('When calling `addDefaults()` with a null value', function() {
		beforeEach(function() {
			helper = new HttpHelper({ a: 1, headers: { b: 2, c: 3 } })
		})

		describe('for a 1st level value', function() {
			beforeEach(function() {
				helper.addDefaults({ headers: null })
			})
			it('should remove that key-path', function() {
				expect(helper.defaults()).to.deep.equal({ a: 1 })
			})
		})

		describe('for a nested value', function() {
			beforeEach(function() {
				helper.addDefaults({ headers: { b: null } })
			})
			it('should remove that key-path', function() {
				expect(helper.defaults()).to.deep.equal({ a: 1, headers: { c: 3 } })
			})
		})
	})

	describe('When setting defaults while creating', function() {
		beforeEach(function() {
			helper = new HttpHelper({ a: 1, headers: { b: 2 } })
		})
		it('should return the defaults with `defaults()`', function() {
			expect(helper.defaults()).to.deep.equal({ a: 1, headers: { b: 2 } })
		})
		describe('and later calling `addDefaults()`', function() {
			beforeEach(function() {
				helper.addDefaults({ headers: { c: 3 }, d: 4 })
			})
			it('should append the new defaults', function() {
				expect(helper.defaults())
					.to.deep.equal({ a: 1, headers: { b: 2, c: 3 }, d: 4 })
			})
		})
	})

	describe('When setting `jar` to true', function() {
		var fakeJar
		beforeEach(function() {
			fakeJar = {}
			fzkes.fake(request, 'jar').returns(fakeJar)
		})
		describe('using the constructor', function() {
			beforeEach(function() {
				helper = new HttpHelper({ jar: true })
			})
			it('should set a new `jar` instance from request', function() {
				expect(helper.defaults()).to.have.property('jar').equals(fakeJar)
			})
		})
		describe('using `defaults()`', function() {
			beforeEach(function() {
				helper = new HttpHelper()
				helper.defaults({ jar: true })
			})
			it('should set a new `jar` instance from request', function() {
				expect(helper.defaults()).to.have.property('jar').equals(fakeJar)
			})
		})
		describe('using `addDefaults()`', function() {
			beforeEach(function() {
				helper = new HttpHelper()
				helper.addDefaults({ jar: true })
			})
			it('should set a new `jar` instance from request', function() {
				expect(helper.defaults()).to.have.property('jar').equals(fakeJar)
			})
		})
	})
})
