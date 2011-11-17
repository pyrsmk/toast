/*
    toast, just a minimal but yet powerful resource loader

    Version     : 0.2.9
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/toast
    License     : MIT
*/

/*
    Load resources
    
    Parameters
        Array resources     : resource list
        Function complete   : called when all resources have been loaded
*/
this.toast=function(resources,complete){
    var toast=this.toast,
        resource,
        node,
        doc=document,
        head=doc.getElementsByTagName('head')[0],
        setTimeout=this.setTimeout,
        createElement='createElement',
        appendChild='appendChild',
        addEventListener='addEventListener',
        onreadystatechange='onreadystatechange',
        styleSheet='styleSheet',
        i,
        scriptsToLoad,
        // Watch if all resources have been loaded
        isComplete=function(){
            if(--scriptsToLoad<1 && complete && complete()===false){
                setTimeout(isComplete);
            }
        },
        // Watch if a CSS resource has been loaded
        watchStylesheet=function(node){
            if(node.sheet || node[styleSheet]){
                isComplete();
            }
            else{
                setTimeout(function(){watchStylesheet(node);});
            }
        },
        // Watch if a script has been loaded
        watchScript=function(){
            if(/ded|co/.test(this.readyState)){
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
        };
    // Waiting for DOM readiness
    if(head || setTimeout(toast)){
        // Format
        if(resources===''+resources){
            resources=[resources];
        }
        // Load resources
        i=scriptsToLoad=resources.length;
        while(resource=resources[--i]){
            // Points out to another resource list
            if(resource.pop){
                toast(resource[0],watchResourceList(resource[1],isComplete));
            }
            // CSS
            else if(/\.css$/.test(resource)){
                // Create LINK element
                node=doc[createElement]('link');
                node.rel=styleSheet;
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
                if(node[onreadystatechange]===null){
                    // Trident, Presto
                    node[onreadystatechange]=watchScript;
                }
                else{
                    // Webkit, Gecko (also IE>=9 and Presto)
                    node.onload=isComplete;
                }
            }
        }
    }
};