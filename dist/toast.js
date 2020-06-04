(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.toast = factory());
}(this, (function () { 'use strict';

    var Toast = (function () {
        function Toast() {
        }
        Toast.prototype.all = function (urls) {
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
        Toast.prototype.css = function (url) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.querySelector('head').appendChild(link);
            return this.promise(link);
        };
        Toast.prototype.js = function (url) {
            var script = document.createElement('script');
            script.src = url;
            document.querySelector('head').appendChild(script);
            return this.promise(script);
        };
        Toast.prototype.promise = function (element) {
            return new Promise(function (resolve, reject) {
                element.addEventListener('load', function () {
                    resolve(element);
                });
                element.addEventListener('error', function () {
                    reject();
                });
            });
        };
        return Toast;
    }());
    var Toast$1 = new Toast();

    return Toast$1;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ub2FzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRvYXN0IGxvYWRlclxuICovXG5jbGFzcyBUb2FzdCB7XG4gICAgLyoqXG4gICAgICogTG9hZCBzZXZlcmFsIHJlc291cmNlcyBmcm9tIFVSTHNcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdXJsc1xuICAgICAqIEByZXR1cm4ge1Byb21pc2U8SFRNTEVsZW1lbnRbXT59XG4gICAgICovXG4gICAgcHVibGljIGFsbCh1cmxzOiBzdHJpbmdbXSk6IFByb21pc2U8SFRNTEVsZW1lbnRbXT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICB1cmxzLm1hcChcbiAgICAgICAgICAgICAgICAodXJsKTogUHJvbWlzZTxIVE1MRWxlbWVudD4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHVybC5zcGxpdCgnLicpLnBvcCgpIS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjc3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNzcyh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdqcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanModXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihgVW5hYmxlIHRvIGRldGVjdCBleHRlbnNpb24gb2YgJyR7dXJsfSdgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBDU1MgVVJMXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxIVE1MRWxlbWVudD59XG4gICAgICovXG4gICAgcHVibGljIGNzcyh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmxcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpIS5hcHBlbmRDaGlsZChsaW5rKVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlKGxpbmspXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBhIEpTIFVSTFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8SFRNTEVsZW1lbnQ+fVxuICAgICAqL1xuICAgIHB1YmxpYyBqcyh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICAgICAgc2NyaXB0LnNyYyA9IHVybFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykhLmFwcGVuZENoaWxkKHNjcmlwdClcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZShzY3JpcHQpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcHJvbWlzZSBiYXNlZCBvbiBhbiBIVE1MRWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEhUTUxFbGVtZW50Pn1cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb21pc2UoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPEhUTUxFbGVtZW50PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtZW50KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVG9hc3QoKVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQUdBO1FBQUE7U0FxRUM7UUE3RFUsbUJBQUcsR0FBVixVQUFXLElBQWM7WUFBekIsaUJBaUJDO1lBaEJHLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDZCxJQUFJLENBQUMsR0FBRyxDQUNKLFVBQUMsR0FBRztnQkFDQSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFHLENBQUMsV0FBVyxFQUFFO29CQUN2QyxLQUFLLEtBQUs7d0JBQ04sT0FBTyxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUN4QixLQUFLLElBQUk7d0JBQ0wsT0FBTyxLQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUN2Qjt3QkFDSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLElBQUksS0FBSyxDQUFDLG9DQUFrQyxHQUFHLE1BQUcsQ0FBQyxDQUN0RCxDQUFBO2lCQUNSO2FBQ0osQ0FDSixDQUNKLENBQUE7U0FDSjtRQVFNLG1CQUFHLEdBQVYsVUFBVyxHQUFXO1lBQ2xCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUE7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7WUFDZixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDNUI7UUFRTSxrQkFBRSxHQUFULFVBQVUsR0FBVztZQUNqQixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1lBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25ELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUM5QjtRQU9PLHVCQUFPLEdBQWYsVUFBZ0IsT0FBb0I7WUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUMvQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO29CQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBQ25CLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO29CQUM5QixNQUFNLEVBQUUsQ0FBQTtpQkFDWCxDQUFDLENBQUE7YUFDTCxDQUFDLENBQUE7U0FDTDtRQUNMLFlBQUM7SUFBRCxDQUFDLElBQUE7QUFFRCxrQkFBZSxJQUFJLEtBQUssRUFBRTs7Ozs7Ozs7In0=
