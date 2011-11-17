Toast 0.2.9
===========

Toast is a tiny resource loader for JS and CSS files.

Features
--------

- load resources as soon as possible to avoid FOUC issues (especially when loading stylesheets)
- infinite nesting
- advanced callback support
- tested against IE 5.5+, Chrome, Safari 3+, Opera 9+, Firefox 2+

Syntax
------

It accepts two parameters:

- a string or an array of strings representing resources to load
- an optional callback

Here's how toast loads resources:

    // Load one css file for mobiles
    toast('css/mobiles.css');

    // Load several resources for desktops
    if(screen.width>800){
        toast([
            'css/screens.css',
            'js/modernizr.js',
            'js/classie.js'
        ]);
    }

And how callbacks are used:

    // The callback is called when jQuery has been loaded
    toast('scripts/jquery.js',function(){log('loaded');});

    // Works, naturally, with several resources
    toast(
        [
            'css/screens.css',
            'js/modernizr.js',
            'js/classie.js'
        ],
        function(){
            log('All is loaded');
        }
    );

Sometimes, on some browsers, scripts are not parsed yet when we want to use them (like calling a function from that script). To resolve that issue, toast provides a simple way:

    toast(
        'scripts/jquery.js',
        function(){
            // The callback will be called until `$` is not set
            if(!window.$){
                return false;
            }
            // jQuery actions
            // .....
        }
    );

This is, returning `false` into the callback makes it called while it doesn't return another value than `false` (so, an `undefined` returned value won't make the callback to hang on).

Finally, as nested resources are fully supported, you can do that:

    toast(
        [
            'css/screens.css',
            [
                [
                    'js/modernizr.js',
                    'js/respond.js',
                    [
                        'js/selectivizr.js',
                        function(){
                            log('Selectivizr has been loaded');
                        }
                    ]
                ],
                function(){
                    log('Modernizr, respond and selectivizr have been loaded');
                }
            ],
            'js/classie.js'
        ],
        function(){
            log('Screens.css, modernizr, respond, selectivizr and classie have been loaded');
        }
    );

License
-------

Toast is licensed under the MIT license.