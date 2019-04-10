(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.toast = factory());
}(this, function () { 'use strict';

    var CssResource = (function () {
        function CssResource() {
        }
        CssResource.prototype.load = function (url) {
            return new Promise(function (resolve, reject) {
                var node = document.createElement('link');
                node.rel = 'stylesheet';
                node.href = url;
                document.querySelector('head').appendChild(node);
                node.onload = function () { return resolve(); };
                node.onerror = function () { return reject(); };
            });
        };
        return CssResource;
    }());

    var JsResource = (function () {
        function JsResource() {
        }
        JsResource.prototype.load = function (url) {
            return new Promise(function (resolve, reject) {
                var node = document.createElement('script');
                node.src = url;
                document.querySelector('head').appendChild(node);
                node.onload = function () { return resolve(); };
                node.onerror = function () { return reject(); };
            });
        };
        return JsResource;
    }());

    var Toast = (function () {
        function Toast() {
        }
        Toast.prototype.load = function (urls) {
            var that = this;
            return Promise.all(urls.map(function (url) {
                if (url.trim() === '') {
                    console.error('[toast] loading aborted: an empty string has been provided');
                    return Promise.reject();
                }
                switch (url.split('.').pop().toLowerCase()) {
                    case 'css':
                        return that.css(url);
                    case 'js':
                        return that.js(url);
                    default:
                        console.error("[toast] loading aborted: unable to detect extension for '" + url + "', please use toast.js() or toast.css() instead");
                        return Promise.reject();
                }
            }));
        };
        Toast.prototype.css = function (url) {
            return (new CssResource()).load(url);
        };
        Toast.prototype.js = function (url) {
            return (new JsResource()).load(url);
        };
        return Toast;
    }());
    var Toast$1 = new Toast();

    return Toast$1;

}));
