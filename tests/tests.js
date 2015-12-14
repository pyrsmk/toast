QUnit.test('One resource', function(assert) {
	var done1 = assert.async(),
		done2 = assert.async();
	
	assert.expect(2);
	
	// One JS resource
	toast(
		['resources/a.js', function() { return window.a; }],
		function() {
			assert.ok(true, 'One JS resource loaded');
			done1();
		}
	);
	
	// One CSS resource
	toast(
		['resources/a.css', function() { return document.styleSheets.length >= 1; }],
		function() {
			assert.ok(true, 'One CSS resource loaded');
			done2();
		}
	);
});

QUnit.test('Several resources', function(assert) {
	var done1 = assert.async(),
		done2 = assert.async(),
		done3 = assert.async();
	
	assert.expect(4);
	
	toast(
		'resources/b.js?v=1',
		'resources/b.css',
		function() {
			assert.ok(true, 'Callback called');
			done1();
		},
		'resources/c.js',
		'resources/c.css',
		['resources/d.js', function() { return window.b && window.c && window.d; }],
		function() {
			assert.ok(true, 'Three JS resources loaded');
			assert.ok(document.styleSheets.length >= 2, 'Two CSS resources loaded');
			done2();
			
			toast(
				'resources/b.js',
				function() {
					assert.ok(window.b == 1, 'Cannot call a resource twice');
					done3();
				}
			);
		}
	);
});

QUnit.start();