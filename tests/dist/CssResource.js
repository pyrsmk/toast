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
    exports["default"] = CssResource;
});
//# sourceMappingURL=CssResource.js.map