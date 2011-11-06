Toast 0.1.0
===========

Toast is just a minimal synchroneous loader for js and css files. Such a loader is especially needed for loading resources with certain conditions, as for responsive development.

It accepts only one parameter: a string or an array of strings that represent the resources to load.

    // Load one file
    toast('css/mobiles.css');
    // Load several resources
    toast([
        'css/screens.css',
        'js/modernizr.js',
        'js/classie.js'
    ]);

License
-------

Toast is licensed under the MIT license.