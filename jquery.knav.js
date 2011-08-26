$(document).bind('loadKnav', function() {

	/* Simple keyboard navigation for jQuery
	 *
	 * Any element with a CSS class of .knav can be navigated using the keyboard, 
	 * using the 'up', 'down' and 'enter' keys.
	 *
	 * Example:
	 *   <a href="/index.html" class="knav">Back to Home</a>
	 *
	 * When the element has focus, and the user presses the 'enter' key, a click event will be sent,
	 * which loads the href of the element.  Existing click handlers on the element will not be overwritten.
	 * 
	 * It's also possible to navigate using wrapper elements. The first anchor with 'knav_link' as CSS class
	 * will be used for the click event, whereas the wrapper element will receive the 'knav_focus' CSS class.
	 *
	 * Example:
	 *
	 * Before focus:
	 *   <div class="article knav">
	 *     <a href="/index.html" class="knav_link">Back to Home</a>
	 *   </div>
	 *
	 * After focus:
	 *   <div class="article knav knav_focus">
	 *     <a href="/index.html" class="knav_link">Back to Home</a>
	 *   </div>
	 *
	 * Written by Bart Zonneveld <mail@bartzon.nl>
	 * Repository at http://github.com/bartzon/jquery.knav
	 *
	*/
	
	$.keynav = {

		// CSS class to add to current item
		focusClass: 'knav_focus', 
		// The first a tag with this CSS class receives a 'click' event
		linkClass:  'knav_link',  
		// All items with this CSS class can be navigated with the keyboard
		items:      $('.knav'),
		
		current: undefined,
		index:   -1,

		up: function() {
			var k = $.keynav;
			
			k.blur(k.current);
			
			k.index -= 1;
			if(k.index < 0) {
				k.index = 0;
			}
			
			if(k.items[k.index]) {
				k.focus(k.items[k.index]);
			}
		},
		
		down: function() {
			var k = $.keynav;
			
			k.blur(k.current);
			
			k.index += 1;
			if(k.index > k.items.length) {
				k.index = k.items.length;
			}
			
			if(k.items[k.index]) {
				k.focus(k.items[k.index])
			}
		},
		
		focus: function(item) {
			var k = $.keynav;
			
			if($(item)) {
				$(item).addClass(k.focusClass);
				k.current = item;
				k.moveWindowTo(item);
			}
		},
		
		blur: function(item) {
			if($(item)) {
				$(item).removeClass($.keynav.focusClass);
			}
		},
		
		moveWindowTo: function(item) {
			var currentHeight = $(item).outerHeight(), offset = $(item).offset();
 			var top           = Math.round(offset.top - currentHeight - ($(window).height()/3) );
			$('html,body').scrollTop(top);
		},
		
		fire: function() {
			var k   = $.keynav;
			// find the first anchor descendant of the current object with class linkClass
			var obj = $(k.current).find('a.'+k.linkClass)[0];
			// or use the current object
			obj     = obj ? $(obj) : $(k.current);
			
			// does the object already have a click handler?
			has_event_listener = obj.data('events') ? obj.data('events').click : false;

			// if not, assign click handler to go to the object's href
			if(obj.attr('href') && !has_event_listener) {
				obj.bind('click.knav', function() { document.location = obj.attr('href'); })
			}
			
			// send the click event
			obj.click();
		},
	}

	$(document).unbind('.knav').bind('keydown.knav', function(event) {	
		var k = $.keynav;
		
		switch(event.keyCode) {
			case 38:
				k.up();
				event.preventDefault();
				break;
			case 40:
				k.down();
				event.preventDefault();
				break;
			case 13:
				k.fire();
				event.preventDefault();
				break;
		}
	});

});

$(document).ready(function() {

	$(document).trigger('loadKnav');
	
})

