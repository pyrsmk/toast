(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.toast = factory());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ub2FzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRvYXN0IGxvYWRlclxuICovXG5jbGFzcyBUb2FzdCB7XG4gICAgLyoqXG4gICAgICogTG9hZCBzZXZlcmFsIHJlc291cmNlcyBmcm9tIFVSTHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHVybHNcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEhUTUxFbGVtZW50W10+fVxuICAgICAqL1xuICAgIHB1YmxpYyBhbGwodXJsczogc3RyaW5nW10pOiBQcm9taXNlPEhUTUxFbGVtZW50W10+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgdXJscy5tYXAoXG4gICAgICAgICAgICAgICAgKHVybCk6IFByb21pc2U8SFRNTEVsZW1lbnQ+ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh1cmwuc3BsaXQoJy4nKS5wb3AoKSEudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3NzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jc3ModXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnanMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmpzKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYFVuYWJsZSB0byBkZXRlY3QgZXh0ZW5zaW9uIG9mICcke3VybH0nYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgQ1NTIFVSTFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8SFRNTEVsZW1lbnQ+fVxuICAgICAqL1xuICAgIHB1YmxpYyBjc3ModXJsOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgbGluay5ocmVmID0gdXJsXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKSEuYXBwZW5kQ2hpbGQobGluaylcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZShsaW5rKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBKUyBVUkxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEhUTUxFbGVtZW50Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMganModXJsOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxFbGVtZW50PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmxcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpIS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2Uoc2NyaXB0KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHByb21pc2UgYmFzZWQgb24gYW4gSFRNTEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7UHJvbWlzZTxIVE1MRWxlbWVudD59XG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9taXNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUHJvbWlzZTxIVE1MRWxlbWVudD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFRvYXN0KClcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFHQTtRQUFBO1NBb0VDO1FBN0RVLG1CQUFHLEdBQVYsVUFBVyxJQUFjO1lBQXpCLGlCQWlCQztZQWhCRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FDSixVQUFDLEdBQUc7Z0JBQ0EsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRyxDQUFDLFdBQVcsRUFBRTtvQkFDdkMsS0FBSyxLQUFLO3dCQUNOLE9BQU8sS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDeEIsS0FBSyxJQUFJO3dCQUNMLE9BQU8sS0FBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDdkI7d0JBQ0ksT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLEtBQUssQ0FBQyxvQ0FBa0MsR0FBRyxNQUFHLENBQUMsQ0FDdEQsQ0FBQTtpQkFDUjthQUNKLENBQ0osQ0FDSixDQUFBO1NBQ0o7UUFRTSxtQkFBRyxHQUFWLFVBQVcsR0FBVztZQUNsQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzNDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO1lBQ2YsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzVCO1FBUU0sa0JBQUUsR0FBVCxVQUFVLEdBQVc7WUFDakIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUMvQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtZQUNoQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDOUI7UUFPTyx1QkFBTyxHQUFmLFVBQWdCLE9BQW9CO1lBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDL0IsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtvQkFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2lCQUNuQixDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtvQkFDOUIsTUFBTSxFQUFFLENBQUE7aUJBQ1gsQ0FBQyxDQUFBO2FBQ0wsQ0FBQyxDQUFBO1NBQ0w7UUFDTCxZQUFDO0lBQUQsQ0FBQyxJQUFBO0FBRUQsa0JBQWUsSUFBSSxLQUFLLEVBQUU7Ozs7Ozs7OyJ9
