/* global describe, it, expect, utils, toast, universe */
/* eslint func-names: ["off"] */
/* eslint prefer-arrow-callback: ["off"] */
/* eslint no-var: ["off"] */
/* eslint vars-on-top: ["off"] */

describe('toast.js()', function () {
    describe('With an URL parameter', function () {
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

    describe('With an HTMLScriptElement parameter', function () {
        it('should return a promise', function () {
            expect(toast.css(utils.createScript())).to.be.an.instanceof(Promise)
        })

        it('should resolve when loading has been deferred', function (done) {
            this.timeout(10000)
            var script = utils.createScript('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test2-script2.js')
            toast.js(script).then(function () {
                done()
            })
            utils.addToHead(script)
        })

        it('last script should have been executed', function () {
            expect(universe).to.equal(2017)
        })

        it('should resolve when loading is already done', function (done) {
            this.timeout(10000)
            var script = utils.createScript('https://s3.eu-west-3.amazonaws.com/dreamysource/toast/test2-script3.js')
            utils.addToHead(script)
            utils.watchAndTrigger(function () {
                return universe === 1988
            }).then(function () {
                toast.js(script).then(function () {
                    done()
                })
            })
        })

        it('last script should have been executed', function () {
            expect(universe).to.equal(1988)
        })

        it('should reject when loading has been deferred', function (done) {
            this.timeout(10000)
            if (!utils.linkOnErrorFeature) this.skip()
            var script = utils.createScript('notfound.js')
            toast.js(script).catch(function () {
                done()
            })
            utils.addToHead(script)
        })

        it('should reject when loading is already done', function (done) {
            this.timeout(10000)
            if (!utils.linkOnErrorFeature) this.skip()
            var script = utils.createScript('notfound.js')
            utils.addToHead(script)
            toast.js(script).catch(function () {
                done()
            })
        })
    })
})
