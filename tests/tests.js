var div = document.createElement('div')
div.id = 'test'
document.querySelector('body').appendChild(div)

function getCss(style) {
    /*console.log(`document.styleSheets.length = ${document.styleSheets.length}`)
    console.log(`sheet in node = ${'sheet' in node}`)
    if ('sheet' in node) {
        console.log(`cssRules in sheet = ${'cssRules' in node.sheet}`)
        if ('cssRules' in node.sheet) {
            console.log(`node.sheet.cssRules.length = ${node.sheet.cssRules.length}`)
        }
    }*/
    return getComputedStyle(document.querySelector('#test')).getPropertyValue(style)
}

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
        toast.css('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test1-style.css').then(function () {
            done()
        })
    })
    it('should have been executed', function () {
        expect(getCss('margin-top')).to.equal('72px')
    })
    it('should reject', function (done) {
        toast.css('notfound.css').catch(function () {
            done()
        })
    })
})

describe('toast.js()', function () {
    it('should return a promise', function () {
        expect(toast.js('')).to.be.a('promise')
    })
    it('should resolve', function (done) {
        toast.js('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test2-script.js').then(function () {
            done()
        })
    })
    it('should have been executed', function () {
        expect(universe).to.not.be.undefined
        expect(universe).to.equal(72)
    })
    it('should reject', function (done) {
        toast.js('notfound.js').catch(function () {
            done()
        })
    })
})

describe('toast.load()', function () {
    // resolve
    it('should resolve', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test3-script.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test3-style.css',
        ]).then(function () {
            done()
        })
    })
    it('should have been executed', function () {
        expect(getCss('margin-top')).to.equal('42px')
        expect(universe).to.equal(42)
    })
    // empty string
    it('should reject for an empty string', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style1.css',
            '',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style2.css',
        ]).catch(function () {
            done()
        })
    })
    it('empty string: first style should not have been executed', function () {
        expect(getCss('margin-top')).to.equal('42px')
    })
    // unrecognized CSS type
    it('should reject for an unrecognized CSS type', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style3.css',
        ]).catch(function () {
            done()
        })
    })
    it('unrecognized CSS type: first style should not have been executed', function () {
        expect(getCss('margin-top')).to.equal('42px')
    })
    // unrecognized JS type
    it('should reject for an unrecognized JS type', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script1.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script3.js',
        ]).catch(function () {
            done()
        })
    })
    it('unrecognized JS type: first script should not have been executed', function () {
        expect(universe).to.equal(42)
    })
    // not found CSS file
    it('should reject for a not found CSS file', function (done) {
        this.timeout(10000)
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-notfound.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style2.css',
        ]).catch(function () {
            done()
        })
    })
    it('not found CSS file: first style have been executed', function () {
        expect(getCss('margin-top')).to.equal('26px')
    })
    // not found JS file
    it('should reject for a not found JS file', function (done) {
        this.timeout(10000)
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-script1.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-notfound.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-script2.js',
        ]).catch(function () {
            done()
        })
    })
    it('not found JS file: first script have been executed', function () {
        expect(universe).to.equal(26)
    })
})
