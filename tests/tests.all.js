/* global describe, it, expect, utils, toast, universe */
/* eslint func-names: ["off"] */
/* eslint prefer-arrow-callback: ["off"] */
/* eslint no-var: ["off"] */
/* eslint vars-on-top: ["off"] */

describe('toast.all()', function () {
    it('should resolve for URLs', function (done) {
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test3-script.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test3-style.css',
        ]).then(function () {
            done()
        })
    })

    it('resolved URLs should have been executed', function () {
        expect(utils.getCss('margin-top')).to.equal('42px')
        expect(universe).to.equal(42)
    })

    it('should resolve for nodes', function (done) {
        this.timeout(10000)
        var style = utils.createLink('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test9-style.css')
        var script = utils.createScript('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test9-script.js')
        utils.addToHead(style)
        utils.addToHead(script)
        toast.all([style, script]).then(function () {
            done()
        })
    })

    it('resolved nodes should have been executed', function () {
        expect(utils.getCss('margin-top')).to.equal('-7200px')
        expect(universe).to.equal(-7200)
    })

    it('should reject for an empty string', function (done) {
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style1.css',
            '',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test4-style2.css',
        ]).catch(function () {
            done()
        })
    })

    it('should reject for an unrecognized CSS type', function (done) {
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test5-style3.css',
        ]).catch(function () {
            done()
        })
    })

    it('should reject for an unrecognized JS type', function (done) {
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script1.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script2',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test6-script3.js',
        ]).catch(function () {
            done()
        })
    })

    it('should reject for a not found CSS file', function (done) {
        if (!utils.linkOnErrorFeature) this.skip()
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style1.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-notfound.css',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test7-style2.css',
        ]).catch(function () {
            done()
        })
    })

    it('should reject for a not found JS file', function (done) {
        this.timeout(10000)
        toast.all([
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-script1.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-notfound.js',
            'https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test8-script2.js',
        ]).catch(function () {
            done()
        })
    })
})
