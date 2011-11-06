/*
    toast, just a synchroneous resource loader

    Version     : 0.1.0
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/toast
    License     : MIT
*/

/*
    Load resources
    
    Parameters
        Array resources
*/
this.toast=function(resources){
    if(!(resources instanceof Array)){
        resources=[resources];
    }
    var resource,
        node,
        doc=document,
        head=doc.getElementsByTagName('head')[0],
        i=-1;
    // Load resources
    while(resource=resources[++i]){
        // Create LINK element
        if(resource.match(/\.css$/)){
            node=doc.createElement('link');
            node.rel='stylesheet';
            node.href=resource;
            head.appendChild(node);
        }
        // Create SCRIPT element
        else{
            node=doc.createElement('script');
            node.src=resource;
            head.appendChild(node);
        }
    }
};