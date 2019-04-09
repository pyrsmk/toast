describe('window.toast', function () {
    it('should exist in window', function () {
        expect(window).to.have.a.property('toast')
        expect(window.toast).to.be.an('object')
    })
})

describe('toast.css()', function () {
    it('should return a promise', function () {
        expect(toast.css('')).to.be.a('promise')
    })
    it('should resolve', function (done) {
        toast.css('assets/style1.css').then(function () {
            done()
        })
    })
    it('should reject', function (done) {
        toast.css('notfound.css').catch(function () {
            done()
        })
    })
    it('must have been executed', function () {
        var rgb = getComputedStyle(document.querySelector('#test')).getPropertyValue('color')
        expect(rgb).to.equal('rgb(102, 51, 153)')
    })
})

describe('toast.js()', function () {
    it('should return a promise', function () {
        expect(toast.js('')).to.be.a('promise')
    })
    it('should resolve', function (done) {
        toast.js('assets/script1.js').then(function () {
            done()
        })
    })
    it('should reject', function (done) {
        toast.js('notfound.js').catch(function () {
            done()
        })
    })
    it('must have been executed', function () {
        expect(universe).to.not.be.undefined
        expect(universe).to.equal(84)
    })
})

describe('toast.load()', function () {
    it('should resolve', function (done) {
        toast.load([
            'assets/script2.js',
            '',
            'assets/style2.css',
            'noextension',
            'assets/script3.js',
        ]).then(function () {
            done()
        })
    })
    it('CSS must have been executed', function () {
        var rgb = getComputedStyle(document.querySelector('#test')).getPropertyValue('background-color')
        expect(rgb).to.equal('rgb(0, 0, 0)')
    })
    it('JS must have been executed', function () {
        expect(universeDivider).to.not.be.undefined
        expect(universeResponse).to.not.be.undefined
        expect(universeResponse).to.equal(42)
    })
})
