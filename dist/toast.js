(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.toast = factory());
}(this, function () { 'use strict';

    var CssResource = (function () {
        function CssResource() {
        }
        CssResource.prototype.load = function (url) {
            return new Promise(function (resolve) {
                var node = document.createElement('link');
                node.rel = 'stylesheet';
                node.href = url;
                document.querySelector('head').appendChild(node);
                var verify = setInterval(function () {
                    if ('sheet' in node) {
                        clearInterval(verify);
                        resolve();
                    }
                }, 50);
            });
        };
        return CssResource;
    }());

    var JsResource = (function () {
        function JsResource() {
        }
        JsResource.prototype.load = function (url) {
            return new Promise(function (resolve) {
                var node = document.createElement('script');
                node.src = url;
                document.querySelector('head').appendChild(node);
                node.onload = function () { return resolve(); };
            });
        };
        return JsResource;
    }());

    var Toast = (function () {
        function Toast() {
        }
        Toast.prototype.load = function (urls) {
            var _this = this;
            return Promise.all(urls.map(function (url) {
                switch (url.split('.').pop()) {
                    case 'css':
                        return _this.css(url);
                    case 'js':
                        return _this.js(url);
                }
            }).filter(function (promise) { return promise !== undefined; }));
        };
        Toast.prototype.css = function (url) {
            return (new CssResource()).load(url);
        };
        Toast.prototype.js = function (url) {
            return (new JsResource()).load(url);
        };
        return Toast;
    }());

    return Toast;

}));
