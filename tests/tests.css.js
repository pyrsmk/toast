describe('toast.css()', function () {
    it('should return a promise', function () {
        expect(toast.css('test')).to.be.an.instanceof(Promise)
    })

    it('should resolve', function (done) {
        this.timeout(10000)
        toast.css('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test1-style.css').then(function () {
            done()
        })
    })

    it('resolved style should have been executed', function () {
        expect(utils.getCss('margin-top')).to.equal('72px')
    })

    it('should reject', function (done) {
        this.timeout(10000)
        if (!utils.linkOnErrorFeature) this.skip()
        toast.css('notfound.css').catch(function () {
            done()
        })
    })
})
