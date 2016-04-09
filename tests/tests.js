QUnit.test('One resource', function(assert) {
	var done1 = assert.async(),
		done2 = assert.async();
	
	assert.expect(2);
	
	// One JS resource
	toast(
		'foo.js',
		function() {
			assert.ok('foo' in window && foo == 1, 'One JS resource loaded');
			done1();
		}
	);
	
	// One CSS resource
	toast(
		'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css',
		function() {
			assert.ok(document.styleSheets.length == 2, 'One CSS resource loaded');
			done2();
		}
	);
});

QUnit.test('Several resources', function(assert) {
	var done1 = assert.async(),
		done2 = assert.async();
	
	assert.expect(4);
	
	toast(
		'https://code.jquery.com/jquery-2.2.3.min.js',
		'https://rawgit.com/pyrsmk/qwest/master/qwest.min.js',
		'https://rawgit.com/pyrsmk/Horizon/master/build/minified/Horizon.min.js',
		function() {
			assert.ok(typeof jQuery == 'function', 'jQuery loaded');			
			assert.ok(typeof qwest == 'object', 'qwest loaded');
			assert.ok(typeof Horizon == 'object', 'Horizon loaded');
			done1();
			
			toast(
				'foo.js',
				function() {
					assert.ok(foo == 1, 'Cannot load a resource twice');
					done2();
				}
			);
		}
	);
});

QUnit.start();