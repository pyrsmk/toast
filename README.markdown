Toast 0.1.0
===========

Toast is just a minimal synchroneous loader for js and css files. Such a loader is especially needed for loading resources, with certain conditions, in responsive development without having horrifying FOUC issues (as with asynchroneous loaders).

It accepts only one parameter: a string or an array of strings that represent the resources to load.

    // Load one css file for mobiles
    toast('css/mobiles.css');
    // Load several resources for screens
    if(screen.width>800){
        toast([
            'css/screens.css',
            'js/modernizr.js',
            'js/classie.js'
        ]);
    }

All resources are loaded in the same order you've listed them, as if you'd did:

    <link rel="stylesheet" href="css/screens.css">
    <script src="js/modernizr.js"></script>
    <script src="js/classie.js"></script>

License
-------

Toast is licensed under the MIT license.