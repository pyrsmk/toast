/* global describe, it, expect, utils */
/* eslint func-names: ["off"] */
/* eslint prefer-arrow-callback: ["off"] */

utils.initTestBlock()

/*
    Tests
*/
describe('window.toast', function () {
    it('should exist in window', function () {
        expect(window).to.have.a.property('toast')
        expect(window.toast).to.be.an('object')
    })
})

