/*
    toast, just a minimal but yet powerful resource loader

    Version     : 0.2.1
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/toast
    License     : MIT
*/

/*
    Load resources
    
    Parameters
        Array resources
*/
this.toast=function(resources,complete,when,callback){
    var resource,
        node,
        doc=document,
        head=doc.getElementsByTagName('head')[0],
        createElement='createElement',
        appendChild='appendChild',
        addEventListener='addEventListener',
        i,
        scriptsToLoad,
        isComplete=function(resource){
            if(!--scriptsToLoad){
                if(complete){
                    complete();
                }
                if(callback){
                    callback();
                }
            }
        },
        watchLink=function(node){
            if(node.textContent || node.text){
                isComplete();
            }
            else{
                setTimeout(function(){watchLink(node);},250);
            }
        },
        watchObject=function(when){
            if(window[when]){
                isComplete();
            }
            else{
                setTimeout(function(){watchObject(when);},250);
            }
        },
        watchScript=function(){
            if(when){
                watchObject(when);
            }
            else{
                isComplete();
            }
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
                        this.toast(resource[0],resource[1],resource[2],isComplete());
                    }
                    // CSS
                    else if(resource.match(/\.css$/)){
                        // Create LINK element
                        node=doc[createElement]('link');
                        node.rel='stylesheet';
                        node.href=resource;
                        head[appendChild](node);
                        // Watching loading state
                        watchLink(node);
                    }
                    // JS
                    else{
                        // Create SCRIPT element
                        node=doc[createElement]('script');
                        node.src=resource;
                        head[appendChild](node);
                        // Watching loading state
                        node.onload=node.onreadystatechange=watchScript;
                    }
                }
            }
            else{
                setTimeout(isDOMReady,250);
            }
        };
    isDOMReady();
};