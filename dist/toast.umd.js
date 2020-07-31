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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QudW1kLmpzIiwic291cmNlcyI6WyIuLi9zcmMvVG9hc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUb2FzdCBsb2FkZXJcbiAqL1xuY2xhc3MgVG9hc3Qge1xuICAgIC8qKlxuICAgICAqIExvYWQgc2V2ZXJhbCByZXNvdXJjZXMgZnJvbSBVUkxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB1cmxzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxIVE1MRWxlbWVudFtdPn1cbiAgICAgKi9cbiAgICBwdWJsaWMgYWxsKHVybHM6IHN0cmluZ1tdKTogUHJvbWlzZTxIVE1MRWxlbWVudFtdPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIHVybHMubWFwKFxuICAgICAgICAgICAgICAgICh1cmwpOiBQcm9taXNlPEhUTUxFbGVtZW50PiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodXJsLnNwbGl0KCcuJykucG9wKCkhLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3NzKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qcyh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKGBVbmFibGUgdG8gZGV0ZWN0IGV4dGVuc2lvbiBvZiAnJHt1cmx9J2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBhIENTUyBVUkxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEhUTUxFbGVtZW50Pn1cbiAgICAgKi9cbiAgICBwdWJsaWMgY3NzKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MRWxlbWVudD4ge1xuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgIGxpbmsuaHJlZiA9IHVybFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykhLmFwcGVuZENoaWxkKGxpbmspXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2UobGluaylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgSlMgVVJMXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxIVE1MRWxlbWVudD59XG4gICAgICovXG4gICAgcHVibGljIGpzKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MRWxlbWVudD4ge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgICBzY3JpcHQuc3JjID0gdXJsXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKSEuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlKHNjcmlwdClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBwcm9taXNlIGJhc2VkIG9uIGFuIEhUTUxFbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8SFRNTEVsZW1lbnQ+fVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvbWlzZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IFByb21pc2U8SFRNTEVsZW1lbnQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBUb2FzdCgpXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBR0E7UUFBQTtTQW9FQztRQTdEVSxtQkFBRyxHQUFWLFVBQVcsSUFBYztZQUF6QixpQkFpQkM7WUFoQkcsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNkLElBQUksQ0FBQyxHQUFHLENBQ0osVUFBQyxHQUFHO2dCQUNBLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUcsQ0FBQyxXQUFXLEVBQUU7b0JBQ3ZDLEtBQUssS0FBSzt3QkFDTixPQUFPLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3hCLEtBQUssSUFBSTt3QkFDTCxPQUFPLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3ZCO3dCQUNJLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxLQUFLLENBQUMsb0NBQWtDLEdBQUcsTUFBRyxDQUFDLENBQ3RELENBQUE7aUJBQ1I7YUFDSixDQUNKLENBQ0osQ0FBQTtTQUNKO1FBUU0sbUJBQUcsR0FBVixVQUFXLEdBQVc7WUFDbEIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMzQyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQTtZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtZQUNmLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM1QjtRQVFNLGtCQUFFLEdBQVQsVUFBVSxHQUFXO1lBQ2pCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDL0MsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7WUFDaEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQzlCO1FBT08sdUJBQU8sR0FBZixVQUFnQixPQUFvQjtZQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDbkIsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sRUFBRSxDQUFBO2lCQUNYLENBQUMsQ0FBQTthQUNMLENBQUMsQ0FBQTtTQUNMO1FBQ0wsWUFBQztJQUFELENBQUMsSUFBQTtBQUVELGtCQUFlLElBQUksS0FBSyxFQUFFOzs7Ozs7OzsifQ==
