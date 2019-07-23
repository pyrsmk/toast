(function () {
  "use strict";

  var _$0 = this;

  var _7 = function () {};

  var _1 = _7.prototype;

  var _3 = function (urls) {
    var _this = this;

    return Promise.all(urls.map(function (url) {
      switch (url.split('.').pop().toLowerCase()) {
        case 'css':
          return _this.css(url);

        case 'js':
          return _this.js(url);

        default:
          return Promise.reject(new Error("Unable to detect extension of '" + url + "'"));
      }
    }));
  };

  var _4 = function (url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.querySelector('head').appendChild(link);
    return this.promise(link);
  };

  var _5 = function (url) {
    var script = document.createElement('script');
    script.src = url;
    document.querySelector('head').appendChild(script);
    return this.promise(script);
  };

  var _6 = function (element) {
    return new Promise(function (resolve, reject) {
      element.addEventListener('load', function () {
        resolve(element);
      });
      element.addEventListener('error', function () {
        reject();
      });
    });
  };

  var __constructor = function () {};

  _1.all = _3;
  _1.css = _4;
  _1.js = _5;
  _1.promise = _6;

  var _0 = (__constructor.prototype = _1, new __constructor());

  _$0.toast = _0;
}).call(this);
