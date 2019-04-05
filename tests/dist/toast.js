System.register("ResourceInterface", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("CssResource", [], function (exports_2, context_2) {
    "use strict";
    var CssResource;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            CssResource = (function () {
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
            exports_2("default", CssResource);
        }
    };
});
System.register("JsResource", [], function (exports_3, context_3) {
    "use strict";
    var JsResource;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            JsResource = (function () {
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
            exports_3("default", JsResource);
        }
    };
});
System.register("ResourcesInterface", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Toast", ["CssResource", "JsResource"], function (exports_5, context_5) {
    "use strict";
    var CssResource_1, JsResource_1, Toast;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (CssResource_1_1) {
                CssResource_1 = CssResource_1_1;
            },
            function (JsResource_1_1) {
                JsResource_1 = JsResource_1_1;
            }
        ],
        execute: function () {
            Toast = (function () {
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
            exports_5("default", Toast);
        }
    };
});
System.register("main", ["Toast"], function (exports_6, context_6) {
    "use strict";
    var Toast_1;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Toast_1_1) {
                Toast_1 = Toast_1_1;
            }
        ],
        execute: function () {
            window.toast = new Toast_1["default"]();
        }
    };
});
//# sourceMappingURL=toast.js.map