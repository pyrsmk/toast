domReady(function(){

    sink('toast',function(test,ok,before,after){

        test('One resource',2,function(){
            // One JS resource
            toast(
                ['resources/a.js',function(){return window.a;}],
                function(){
                    ok(true,'One JS resource loaded');
                }
            );
            // One CSS resource
            toast(
                ['resources/a.css',function(){return document.styleSheets.length>=1;}],
                function(){
                    ok(true,'One CSS resource loaded');
                }
            );
        });

        test('Several resources',3,function(){
            toast(
                'resources/b.js',
                'resources/b.css',
                function(){
                    ok(true,'Callback called');
                },
                'resources/c.js',
                'resources/c.css',
                ['resources/d.js',function(){return window.b && window.c && window.d;}],
                function(){
                    ok(true,'Three JS resources loaded');
                    ok(document.styleSheets.length>=2,'Two CSS resources loaded');
                }
            );
        });

    });

    start();

});
