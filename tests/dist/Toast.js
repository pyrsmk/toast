(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CssResource", "./JsResource"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CssResource_1 = require("./CssResource");
    var JsResource_1 = require("./JsResource");
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
            return (new CssResource_1["default"]()).load(url);
        };
        Toast.prototype.js = function (url) {
            return (new JsResource_1["default"]()).load(url);
        };
        return Toast;
    }());
    exports["default"] = Toast;
});
//# sourceMappingURL=Toast.js.map