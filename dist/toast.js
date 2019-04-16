(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.toast = factory());
}(this, function () { 'use strict';

    var CssResource = (function () {
        function CssResource() {
        }
        CssResource.prototype.load = function (url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.querySelector('head').appendChild(link);
            return this.promise(link);
        };
        CssResource.prototype.listen = function (node) {
            return this.load(node.href);
        };
        CssResource.prototype.promise = function (node) {
            var link = node;
            return new Promise(function (resolve, reject) {
                link.onload = function () { return resolve(link); };
                link.onerror = function () { return reject(); };
            });
        };
        return CssResource;
    }());

    var JsResource = (function () {
        function JsResource() {
        }
        JsResource.prototype.load = function (url) {
            var script = document.createElement('script');
            script.src = url;
            document.querySelector('head').appendChild(script);
            return this.promise(script);
        };
        JsResource.prototype.listen = function (node) {
            return this.load(node.src);
        };
        JsResource.prototype.promise = function (node) {
            var script = node;
            return new Promise(function (resolve, reject) {
                script.onload = function () { return resolve(script); };
                script.onerror = function () { return reject(); };
                script.onreadystatechange = function () {
                    if (script.readyState === 'complete') {
                        resolve(script);
                    }
                };
            });
        };
        return JsResource;
    }());

    var Toast = (function () {
        function Toast() {
            this.name = '[Toast]';
        }
        Toast.prototype.all = function (items) {
            var _this = this;
            var that = this;
            return Promise.all(items.map(function (item) {
                if (typeof item === 'string') {
                    switch (item.split('.').pop().toLowerCase()) {
                        case 'css':
                            return that.css(item);
                        case 'js':
                            return that.js(item);
                        default:
                            console.error(_this.name + " unable to detect extension of '" + item + "'");
                            return Promise.reject();
                    }
                }
                else if (item instanceof HTMLLinkElement) {
                    return that.css(item);
                }
                else if (item instanceof HTMLScriptElement) {
                    return that.js(item);
                }
                console.error(_this.name + " unexpected error");
                return Promise.reject();
            }));
        };
        Toast.prototype.css = function (item) {
            return this.resource(new CssResource(), item);
        };
        Toast.prototype.js = function (item) {
            return this.resource(new JsResource(), item);
        };
        Toast.prototype.resource = function (resource, item) {
            if (typeof item === 'string') {
                return resource.load(item);
            }
            else {
                return resource.listen(item);
            }
        };
        return Toast;
    }());
    var Toast$1 = new Toast();

    return Toast$1;

}));
