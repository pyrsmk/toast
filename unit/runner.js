domReady(function(){

    sink('toast',function(test,ok,before,after){

        test('One resource',2,function(){
            // One JS resource
            toast(
                'resources/a.js',
                function(){
                    ok(true,'One JS resource loaded');
                },
                function(){
                    return !!window.a;
                }
            );
            // One CSS resource
            toast(
                'resources/a.css',
                function(){
                    ok(document.styleSheets.length==1,'One CSS resource loaded');
                }
            );
        });
        
        test('Several resources',4,function(){
            toast(
                [
                    'resources/b.js',
                    'resources/b.css',
                    'resources/c.js',
                    'resources/c.css',
                    [
                        [
                            'resources/d.js',
                            [
                                'resources/e.js',
                                function(){
                                    ok(true,'One JS resource loaded [level 3]');
                                },
                                function(){
                                    return !!window.e;
                                }
                            ]
                        ],
                        function(){
                            ok(true,'Two JS resources loaded [level 2]');
                        },
                        function(){
                            return !!window.d;
                        }
                    ]
                ],
                function(){
                    ok(true,'Four JS resources loaded [level 1]');
                    ok(document.styleSheets.length==3,'Two CSS resources loaded [level 1]');
                },
                function(){
                    return !!window.b && !!window.c;
                }
            );
        });

    });

    start();

});
