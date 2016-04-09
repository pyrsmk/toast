toast 2.0.0
===========

Toast is a tiny resource loader for JS and CSS files.

Install
-------

You can pick the minified library or install it with :

```
npm install pyrsmk-toast
bower install toast
jam install pyrsmk-toast
```

Changes from v1
---------------

Be careful! The loading state detector has been redesigned and additional loading verification callbacks have been dropped.

Syntax
------

There's a big thing to have in mind: resources are loaded asynchronous until a callback is encountered. That said, let's dig in it. The library accept as many parameters as you want of the following types: a string (a resource's URL), an array (a resource's URL and a loading validation callback) or a function (an arbitrary callback).

But some examples are better to understand the whole thing:

```javascript
// Load one css file for mobiles
toast('css/mobiles.css');

// Load several resources for desktops
if(screen.width > 800) {
    toast(
        'css/screens.css',
        'js/modernizr.js',
        'js/classie.js'
    );
}

// Launch a callback when the CSS has been downloaded, and another when scripts have been downloaded too
toast(
    'css/screens.css',
    function() {
        log('screens.css downloaded');
    },
    'js/modernizr.js',
    'js/classie.js',
    function() {
        log('modernizr & classie downloaded');
    }
);
```

License
-------

Licensed under the [MIT license](http://dreamysource.mit-license.org).
