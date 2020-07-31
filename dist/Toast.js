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
export default new Toast();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVG9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7SUFBQTtJQW9FQSxDQUFDO0lBN0RVLG1CQUFHLEdBQVYsVUFBVyxJQUFjO1FBQXpCLGlCQWlCQztRQWhCRyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FDSixVQUFDLEdBQUc7WUFDQSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3pDLEtBQUssS0FBSztvQkFDTixPQUFPLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3hCLEtBQUssSUFBSTtvQkFDTCxPQUFPLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZCO29CQUNJLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxLQUFLLENBQUMsb0NBQWtDLEdBQUcsTUFBRyxDQUFDLENBQ3RELENBQUE7YUFDUjtRQUNMLENBQUMsQ0FDSixDQUNKLENBQUE7SUFDTCxDQUFDO0lBUU0sbUJBQUcsR0FBVixVQUFXLEdBQVc7UUFDbEIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtRQUNmLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBUU0sa0JBQUUsR0FBVCxVQUFVLEdBQVc7UUFDakIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNoQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQU9PLHVCQUFPLEdBQWYsVUFBZ0IsT0FBb0I7UUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwQixDQUFDLENBQUMsQ0FBQTtZQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQzlCLE1BQU0sRUFBRSxDQUFBO1lBQ1osQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXBFRCxJQW9FQztBQUVELGVBQWUsSUFBSSxLQUFLLEVBQUUsQ0FBQSJ9