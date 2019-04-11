/* global describe, it, expect, toast, universe */
/* eslint no-var: ["off"] */
/* eslint func-names: ["off"] */
/* eslint prefer-arrow-callback: ["off"] */
/* eslint vars-on-top: ["off"] */

/*
    Init #test block for CSS tests
*/
var div = document.createElement('div')
div.id = 'test'
document.querySelector('body').appendChild(div)

/*
    Detect link.onerror support
*/
var link = document.createElement('link')
var linkOnErrorSupport = false
link.rel = 'stylesheet'
link.href = 'notfound'
link.onerror = function () {
    linkOnErrorSupport = true
}
document.querySelector('head').appendChild(link)

/*
    Abstract CSS property retrieving
*/
function getCss(style) {
    return getComputedStyle(document.querySelector('#test')).getPropertyValue(style)
}

/*
    Base: window.toast
*/
describe('window.toast', function () {
    it('should exist in window', function () {
        expect(window).to.have.a.property('toast')
        expect(window.toast).to.be.an('object')
    })
})

/*
    toast.css()
*/
describe('toast.css()', function () {
    it('should return a promise', function () {
        expect(toast.css('')).to.be.an.instanceof(Promise)
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
        if (!linkOnErrorSupport) this.skip()
        toast.css('notfound.css').catch(function () {
            done()
        })
    })
})

/*
    toast.js()
*/
describe('toast.js()', function () {
    it('should return a promise', function () {
        expect(toast.css('')).to.be.an.instanceof(Promise)
    })
    it('should resolve', function (done) {
        toast.js('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test2-script.js').then(function () {
            done()
        })
    })
    it('should have been executed', function () {
        expect(universe).to.equal(72)
    })
    it('should reject', function (done) {
        toast.js('notfound.js').catch(function () {
            done()
        })
    })
})

/*
    toast.load()
*/
describe('toast.load()', function () {
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
    it('should reject for an empty string', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style1.css',
            '',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style2.css',
        ]).catch(function () {
            done()
        })
    })
    it('should reject for an unrecognized CSS type', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style3.css',
        ]).catch(function () {
            done()
        })
    })
    it('should reject for an unrecognized JS type', function (done) {
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script1.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script3.js',
        ]).catch(function () {
            done()
        })
    })
    it('should reject for a not found CSS file', function (done) {
        if (!linkOnErrorSupport) this.skip()
        this.timeout(10000)
        toast.load([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-notfound.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style2.css',
        ]).catch(function () {
            done()
        })
    })
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
})
