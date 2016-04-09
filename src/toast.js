/*! toast 2.0.0 (https://github.com/pyrsmk/toast) */

var handled_resources = {};

function toast() {
	var head = document.getElementsByTagName('head')[0],
		
	// Load as much resources as we can
	loadResources = function(resources) {
		// Waiting for DOM readiness then load resources
		if(!head) {
			setTimeout(function() {
				loadResources(resources);
			}, 50);
		}
		// Load resources
		else if(resources.length) {
			var i = -1,
				resource,
				callback;
			while(resource = resources[++i]) {
				// Resource
				if(typeof resource == 'string') {
					loadResource(resource);
				}
				// Callback
				else if(typeof resource == 'function') {
					callback = resource;
					break;
				}
			}
			watchResources(callback, Array.prototype.slice.call(resources, i+1));
		}
	},

	// Load one resource
	loadResource = function(resource) {
		// Extract resource name
		var name = /(^.+\.\w+)(\?.*)?$/.exec(resource)[1],
			node;
		// Verify if the resource is not already handled
		if(name in handled_resources) {
			return;
		}
		// Add resource to loading stack
		handled_resources[name] = false;
		// JS
		if(/\.js$/.test(name)) {
			// Create SCRIPT element
			node = document.createElement('script');
			node.src = resource;
			node.type = 'text/javascript';
			head.appendChild(node);
			// Watch loading state
			var version = navigator.appVersion.match(/MSIE (\d)/);
			if(version !== null && parseInt(version[1], 10) < 9) {
				// IE
				node.onreadystatechange = function() {
					if(/ded|co/.test(this.readyState)) {
						handled_resources[name] = true;
					}
				};
			}
			else {
				// Other browsers
				node.onload = function() {
					handled_resources[name] = true;
				};
			}
		}
		// CSS
		else if(/\.css$/.test(name)) {
			// Create LINK element
			node = document.createElement('link');
			node.rel = 'styleSheet';
			node.href = resource;
			head.appendChild(node);
			// Watch loading state
			watchStylesheet(node, name);
		}
	},

	// Watch if all resources have been loaded
	watchResources = function(callback, resourcesToLoad) {
		for(var name in handled_resources) {
			if(!handled_resources[name]) {
				setTimeout(function() {
					watchResources(callback, resourcesToLoad);
				}, 50);
				return;
			}
		}
		if(typeof callback == 'function') {
			callback();
		}
		loadResources(resourcesToLoad);
	},

	// Watch if a CSS resource has been loaded
	watchStylesheet = function(node, name) {
		if(node.sheet || node.styleSheet) {
			handled_resources[name] = true;
		}
		else {
			setTimeout(function() {
				watchStylesheet(node, name);
			}, 50);
		}
	};
	
	// Load resources
	loadResources(arguments);
}