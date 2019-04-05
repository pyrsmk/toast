(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
    exports["default"] = JsResource;
});
//# sourceMappingURL=JsResource.js.map