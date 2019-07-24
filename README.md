# Toast v3

Toast is a promise-based asset loader for JS and CSS files. It aims to optimize web site performance by loading and deferring the needed assets.

As a side note: Toast is packaged as an UMD module.

## Set up

```sh
yarn add toast-loader
```

Since it have a small footprint (0.8kb), Toast can be loaded as soon as possible in the `HEAD` tag:

```html
<head>
    <script src="node_modules/toast-loader/dist/toast.min.js"></script>
</head>
```

Or even better, you can inline it in your HTML page to improve your loading performance.

## The API

```js
toast.css(url: string): Promise
toast.js(url: string): Promise
toast.all(urls: string[]): Promise
```

## Examples

```js
if (dark_mode === true) {
    toast.css('styles/dark.css')
} else {
    toast.css('styles/light.css')
}
```

```js
toast.js('http://some.cdn.com/jquery.js').then(() => {
    toast.js('http://some.cdn.com/jquery-myplugin.js').then(() => {
        $('.someClass').myPlugin()
    })
})
```

```js
await toast.all([
    'assets/css/styles1.css',
    'assets/css/styles2.css',
    'assets/js/script1.js',
    'assets/js/script2.js',
    'assets/js/script3.js',
])
console.log('Everything has been loaded, yay!')
```

## Browser compatibility

Toast is using built-in promises. If you need to support IE9-11, you must add the [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) library before loading Toast. Here's the compatibility table for the [Promise feature](https://www.caniuse.com/#feat=promises).

IE9-IE11 and Edge never trigger `error` event on CSS loading if something went wrong. Keep this in mind when you're using `catch` promise block with Toast.

If you want to look at some feature supporting details, you can take a look at this [compatibility table](https://pie.gd/test/script-link-events/).

It worth noting that Toast has been designed to be compatible with modern browsers and IE9+. Supporting other older browsers would have a negative impact on the library size.

## Development

Install the dependencies with:

```sh
yarn install
```

Build the lib with:

```sh
yarn build
```

## Testing

Tests are written with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) and run with [Karma](https://karma-runner.github.io/latest/index.html) on [LambdaTest](https://www.lambdatest.com/).

First, you will need to set up you're own environment:

- create your account on LambdaTest
- download the [tunnel software](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/), it will act as a gateway between Karma and LambdaTest
- verify that the `LT` command is accessible (e.g. in the `PATH`)
- get your credentials from the Automation page, they are located under the key icon
- set them in your environment, per example in your `.bashrc`:

```sh
export LT_USERNAME="<your_username>"
export LT_ACCESS_KEY="<your_access_key>"
```

Finally, you can run the tests with:

```sh
yarn test
```

They will be run under the following browsers:

- Chrome 73
- Firefox 66
- Edge 18
- IE 9-11
- Safari 12

If needed, you can run the tests under only one browser with:

```sh
yarn chrome
yarn firefox
yarn edge
yarn ie11
yarn ie10
yarn ie9
yarn safari
```

## License

Licensed under the [MIT license](http://dreamysource.mit-license.org).
