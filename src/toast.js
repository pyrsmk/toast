/*
    toast, just a minimal but yet powerful resource loader

    Version     : 0.2.8
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/toast
    License     : MIT
    
    Failures
    
        Safari 3: unit failed on CSS loading, because of document.styleSheets
*/

/*
    Load resources
    
    Parameters
        Array resources     : resource list
        Function complete   : called when all resources have been loaded
*/
this.toast=function(resources,complete){
    var resource,
        node,
        doc=document,
        head=doc.getElementsByTagName('head')[0],
        createElement='createElement',
        appendChild='appendChild',
        addEventListener='addEventListener',
        onreadystatechange='onreadystatechange',
        i,
        scriptsToLoad,
        // Watch if all resources have been loaded
        isComplete=function(){
            if(--scriptsToLoad<1){
                if(complete){
                    if(complete()===false){
                        setTimeout(isComplete,250);
                    }
                }
            }
        },
        // Watch if a CSS resource has been loaded
        watchStylesheet=function(node){
            if(node.sheet || node.styleSheet){
                isComplete();
            }
            else{
                setTimeout(
                    function(node){
                        return function(){
                            watchStylesheet(node);
                        };
                    }(node),
                    250
                );
            }
        },
        // Watch if a script has been loaded
        watchScript=function(){
            if(this.readyState.match(/^(loade|c)/)){
                isComplete();
            }
        },
        // Watch a resource list
        watchResourceList=function(local,global){
            return function(){
                if(local){
                    local();
                }
                global();
            };
        },
        // Waiting for the DOM readiness
        isDOMReady=function(){
            if(head){
                // Format
                if(resources===''+resources){
                    resources=[resources];
                }
                // Load resources
                i=scriptsToLoad=resources.length;
                while(resource=resources[--i]){
                    // Points out to another resource list
                    if(resource.pop){
                        this.toast(resource[0],watchResourceList(resource[1],isComplete));
                    }
                    // CSS
                    else if(resource.match(/\.css$/)){
                        // Create LINK element
                        node=doc[createElement]('link');
                        node.rel='stylesheet';
                        node.href=resource;
                        head[appendChild](node);
                        // Watching loading state
                        watchStylesheet(node);
                    }
                    // JS
                    else{
                        // Create SCRIPT element
                        node=doc[createElement]('script');
                        node.src=resource;
                        head[appendChild](node);
                        // Watching loading state
                        // ----- Trident, Presto
                        if(node[onreadystatechange]===null){
                            node[onreadystatechange]=watchScript;
                        }
                        // ----- Webkit, Gecko (IE>=9, Presto)
                        else{
                            node.onload=isComplete;
                        }
                    }
                }
            }
            else{
                setTimeout(isDOMReady,250);
            }
        };
    isDOMReady();
};