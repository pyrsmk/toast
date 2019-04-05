(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Toast"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Toast_1 = require("./Toast");
    window.toast = new Toast_1["default"]();
});
//# sourceMappingURL=main.js.map