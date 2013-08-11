describe('unit/defaults.js', function() {
	var request = require('request')
	var helper
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
