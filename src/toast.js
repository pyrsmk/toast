/*
    toast, the simple resource loader

    Version     : 1.0.0
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/toast
    License     : MIT
*/

this.toast=function(){
    var doc=document,
        head=doc.getElementsByTagName('head')[0],
        setTimeout=this.setTimeout,
        createElement='createElement',
        appendChild='appendChild',
        addEventListener='addEventListener',
        onreadystatechange='onreadystatechange',
        styleSheet='styleSheet',
        ten=10,
        loading=0,
        decrementLoading=function(){--loading;},
        i,
        // Load as much resources as we can
        loadResources=function(resources,callback,a,b){
            // Waiting for DOM readiness then load resources
            if(!head){
                setTimeout(function(){loadResources(resources);},ten);
            }
            // Load resources
            else if(resources.length){
                i=-1;
                while(a=resources[++i]){
                    // Simple callback
                    if((b=typeof a)=='function'){
                        callback=function(){a();return true;};
                        break;
                    }
                    // Resource
                    else if(b=='string'){
                        loadResource(a);
                    }
                    // Resource + validation callback
                    else if(a.pop){
                        loadResource(a[0]);
                        callback=a[1];
                        break;
                    }
                }
                watchResources(callback,Array.prototype.slice.call(resources,i+1));
            }
        },
        // Load one resource
        loadResource=function(resource,a){
            ++loading;
            // CSS
            if(/\.css$/.test(resource)){
                // Create LINK element
                a=doc[createElement]('link');
                a.rel=styleSheet;
                a.href=resource;
                head[appendChild](a);
                // Watching loading state
                watchStylesheet(a);
            }
            // JS
            else{
                // Create SCRIPT element
                a=doc[createElement]('script');
                a.src=resource;
                head[appendChild](a);
                // Watching loading state
                if(a[onreadystatechange]===null){
                    // Trident, Presto
                    a[onreadystatechange]=watchScript;
                }
                else{
                    // Webkit, Gecko (also IE>=9 and Presto)
                    a.onload=decrementLoading;
                }
            }
        },
        // Watch if all resources have been loaded
        watchResources=function(callback,resourcesToLoad){
            if(!loading){
                if(!callback || callback()){
                    loadResources(resourcesToLoad);
                    return;
                }
            }
            setTimeout(function(){watchResources(callback,resourcesToLoad);},ten);
        },
        // Watch if a CSS resource has been loaded
        watchStylesheet=function(node){
            if(node.sheet || node[styleSheet]){
                decrementLoading();
                return;
            }
            setTimeout(function(){watchStylesheet(node);},ten);
        },
        // Watch if a script has been loaded
        watchScript=function(){
            if(/ded|co/.test(this.readyState)){
                decrementLoading();
            }
        };
    // Load resources
    loadResources(arguments);
};