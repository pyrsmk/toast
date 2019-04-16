/* global describe, it, expect, utils, toast */
/* eslint no-var: ["off"] */
/* eslint vars-on-top: ["off"] */
/* eslint func-names: ["off"] */
/* eslint prefer-arrow-callback: ["off"] */

/*
    Tests
*/
describe('toast.css()', function () {
    describe('With an URL parameter', function () {
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

    describe('With an HTMLLinkElement parameter', function () {
        it('should return a promise', function () {
            expect(toast.css(utils.createLink())).to.be.an.instanceof(Promise)
        })

        it('should resolve when loading has been deferred', function (done) {
            this.timeout(10000)
            var link = utils.createLink('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test1-style2.css')
            toast.css(link).then(function () {
                done()
            })
            utils.addToHead(link)
        })

        it('deferred style should have been executed', function () {
            expect(utils.getCss('margin-top')).to.equal('2017px')
        })

        it('should resolve when loading is already done', function (done) {
            this.timeout(10000)
            var link = utils.createLink('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test1-style3.css')
            utils.addToHead(link)
            utils.watchAndTrigger(function () {
                return utils.getCss('margin-top') === '1988px'
            }).then(function () {
                toast.css(link).then(function () {
                    done()
                })
            })
        })

        it('already done style should have been executed', function () {
            expect(utils.getCss('margin-top')).to.equal('1988px')
        })

        it('should reject when loading has been deferred', function (done) {
            this.timeout(10000)
            if (!utils.linkOnErrorFeature) this.skip()
            var link = utils.createLink('notfound.css')
            toast.css(link).catch(function () {
                done()
            })
            utils.addToHead(link)
        })

        it('should reject when loading is already done', function (done) {
            this.timeout(10000)
            if (!utils.linkOnErrorFeature) this.skip()
            var link = utils.createLink('notfound.css')
            utils.addToHead(link)
            toast.css(link).catch(function () {
                done()
            })
        })
    })
})
