describe('toast.js()', function () {
    it('should return a promise', function () {
        expect(toast.js('test')).to.be.an.instanceof(Promise)
    })

    it('should resolve', function (done) {
        this.timeout(10000)
        toast.js('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test2-script.js').then(function () {
            done()
        })
    })

    it('last script should have been executed', function () {
        expect(universe).to.equal(72)
    })

    it('should reject', function (done) {
        this.timeout(10000)
        toast.js('notfound.js').catch(function () {
            done()
        })
    })
})
