describe('unit/defaults.js', function() {
	describe('When setting defaults while creating', function() {
		var helper
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
})
