# Toast v3

Toast is a promise-based JS/CSS loader for the browser. It aims to optimize web site performance by loading your assets asynchroneoulsy.

## Set up

The preferred way to load toast in your application is to install it via NPM (or yarn), and to import it directly in your codebase (it has a very small footprint, and the sooner it's loaded the better).

```sh
npm install toast-loader
```

You have several options to load it in your code depending on your application environment:

- by inlining it in a `<script>` tag
- with `const { toast } = require('toast-loader')`
- with `import { toast } from 'toast-loader'`

You can also load it from the usual `<script>` tag in your `<head>`, but I advise you to use a [jsDelivr CDN](https://www.jsdelivr.com/) instead of loading it the installed node module:

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/toast-loader@3.0.3"></script>
</head>
```

Be sure to use the latest version of toast and to keep a fixed version in production environment.

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
const handleErrors = error => {
    console.log(error)
}

toast.js('http://some.cdn.com/jquery.js')
    .then(() => {
        toast.js('http://some.cdn.com/jquery-myplugin.js')
            .then(() => $('.someClass').myPlugin())
            .catch(handleErrors)
    })
})
    .catch(handleErrors)
```

```js
await toast.all([
    'assets/css/styles1.css',
    'assets/js/script1.js',
    'assets/js/script2.js',
    'assets/css/styles2.css',
    'assets/js/script3.js',
])
console.log('Everything has been loaded, yay!')
```

`toast.all` relies on automatic extension detection. If your URL does not have an extension (it can happen with CDNs), you'll need to use `Promise.all` instead:

```js
await Promise.all([
    toast.css('assets/css/styles1'),
    toast.js('assets/js/script1'),
    toast.js('assets/js/script2'),
    toast.css('assets/css/styles2'),
    toast.js('assets/js/script3'),
])
console.log('Everything has been loaded, yay!')
```

## Browser compatibility

IE8 support (and prior) has been dropped. If you badly need it, you can open an issue and I will see what I can do to restore it as a separate build.

Toast is using built-in promises, so if you need to support IE9-11, you must add the [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) library before loading Toast. Here's the compatibility table for the [Promise feature](https://www.caniuse.com/#feat=promises).

For your information, IE9-IE11 and Edge never trigger `error` event on CSS loading if something went wrong. Keep this in mind when you're using `catch` promise block with Toast.

If you want to look at `SCRIPT`/`LINK` node features support details, you can take a look at this [compatibility table](https://pie.gd/test/script-link-events/).

## Development

Install the dependencies with:

```sh
npm install
```

Build the lib with:

```sh
npm run build
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
npm run test
```

They will be run against the following browsers:

- Chrome 73
- Firefox 66
- Edge 18
- IE 9-11
- Safari 12

If needed, you can run the tests against one specific browser with:

```sh
npm run chrome
npm run firefox
npm run edge
npm run ie11
npm run ie10
npm run ie9
npm run safari
```

## License

Licensed under the [MIT license](http://dreamysource.mit-license.org).
