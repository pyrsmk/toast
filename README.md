# Toast v3

Toast is a promise-based JS/CSS loader for the browser. It aims to optimize web site performance by loading your assets asynchronoulsy.

## Quick note on IE9/10 support

Support has been dropped for these browsers since Mocha/Sinon (which is used to run our tests) does not support them anymore. Since it would take some time to migrate the tests, that IE9/10 is not supported anymore by Microsoft, and that its market share have dropped under 1%, we took the decision to stop our support too.

For the time being, Toast `3.0.2` will work with IE9/10. Since the code shouldn't evolve too much, you should be safe in the far future until Toast reaches a breaking change.

# Compatibility list

Toast is tested against:

- Chrome 83 (older version should be good too)
- Firefox 76 (older version should be good too)
- Edge 83 (older version should be good too)
- Safari 11-13
- IE11
- Android 4.4-10
- iOS 10-13

## Set up

The preferred way to load toast in your application is to install it via NPM (or [Yarn](https://yarnpkg.com/)), and import it directly in your codebase (it has a very small footprint, and the sooner it's loaded the better).

```sh
npm install toast-loader
```

You have several options to load it in your code depending on your application environment:

- by inlining it in a `<script>` tag
- with `const { toast } = require('toast-loader')`
- with `import { toast } from 'toast-loader'`

You can also load it from the usual `<script>` tag in your `<head>`, but I advise you to use a [CDN](https://www.jsdelivr.com/) instead of loading it from your own server:

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/toast-loader@3.0.3"></script>
</head>
```

Be sure to use the latest version of Toast and keep a fixed version in production environment (to avoid breaking changes).

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

`toast.all` relies on automatic extension detection. If your URL does not contain a file extension you'll need to use `Promise.all` instead and do some extra work:

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

- IE10 support (and prior) has been removed since it's not supported by Microsoft anymore and their market share have dropped under 1%
- Toast is using built-in promises, so if you need to support I11, you must add the [promise-polyfill](https://github.com/taylorhakes/promise-polyfill) library before loading toast: here's the compatibility table for the [Promise feature](https://www.caniuse.com/#feat=promises)
- for your information, IE11 and Edge never trigger `error` event on CSS loading if something goes wrong; keep this in mind when you're using `catch` promise block
- if you want to learn more about `SCRIPT`/`LINK` node feature support details, you can take a look at this [compatibility table](https://pie.gd/test/script-link-events/)

## Development

Install the dependencies with:

```sh
npm install
```

And build the lib with:

```sh
npm run build
```

Look at the scripts in `package.json` file for more details.

## Testing

Tests are written with [Mocha](https://mochajs.org/) and [Sinon](https://sinonjs.org/), and can be run with:

```sh
npm run test
```

It should open your default browser (under a Gnome desktop). If not, just drag and drop the `tests/index.html` in your preferred browser.

---

These tests are just for local debugging when in development phase but they need to pass the Karma tests. [Karma](https://karma-runner.github.io/latest/index.html) is a tool to execute unit tests on remote browsers with Selenium/Appium. To be able to run them, you'll need an account on [BrowserStack](https://www.browserstack.com/). It's the only service that have a free plan for open-source projects.

When your account is ready, you must prepare your environment by setting global variables in a file that is loaded when your console initializes, like `.bashrc`, `.zshrc` or `.profile`:

- go to the [Automate page](https://automate.browserstack.com/dashboard/v2)
- display your `ACCESS KEY` (it's accessible on the right of the search bar)
- set your env variables like so:
    ```sh
    export BROWSERSTACK_USERNAME="<your_username>"
    export BROWSERSTACK_ACCESS_KEY="<your_access_key>"
    ```

Then, run the karma tests with:

```sh
npm run karma:all
```

The results will be displayed in the console and on the Automate page of your account.

If you want to only run tests on a specific browser you can use one of the following commands:

```sh
npm run karma:chrome
npm run karma:firefox
npm run karma:safari13
npm run karma:safari12
npm run karma:safari11
npm run karma:edge
npm run karma:ie11
npm run karma:android10
npm run karma:android9
npm run karma:android8
npm run karma:android7
npm run karma:android6
npm run karma:android5
npm run karma:android44
npm run karma:ios13
npm run karma:ios12
npm run karma:ios11
npm run karma:ios10
```

Note: I don't know why but the tests can be unstable in some VMs when running all Karma tests in parallel; don't hesitate to re-run tests on a specific VM to verify.

## License

[MIT](http://dreamysource.mit-license.org).
