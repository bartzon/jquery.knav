$(document).bind('loadKnav', function() {

	/* Simple keyboard navigation for jQuery
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

		nextItem: function() {
			var k = $.keynav;
			var i = k.index + 1;
		
			var item = k.items[i];
			
			if($(item) && k.isVisible(item)) {
				k.index = i;
				return $(item);
			} else {
				return false;
			}
		},
		
		prevItem: function() {
			var k = $.keynav;
			var i = k.index - 1;
			
			var item = k.items[i];
			if($(item) && k.isVisible(item)) {
				k.index = i;
				return $(item);
			} else {
				return false;
			}
		},
		
		up: function() {
			var k = $.keynav;
			
			var item = k.prevItem();
			
			if(item) {
				k.focus(item);
			}
		},
		
		down: function() {
			var k = $.keynav;
			
			var item = k.nextItem();

			if(item) {
				k.focus(item);
			}
		},
		
		focus: function(item) {
			var k = $.keynav;
			
			if($(item)) {
				k.blur(k.current);
				$(item).addClass(k.focusClass);
				k.current = $(item);
				k.moveWindowTo(item);
			}
		},
		
		blur: function(item) {
			if($(item)) {
				$(item).removeClass($.keynav.focusClass);
			}
		},
		
		moveWindowTo: function(item) {
			var k = $.keynav;
			var out_of_view = k.belowTheFold(item) || k.aboveTheFold(item);
			
			if(k.isVisible(item) && out_of_view) {
				var currentHeight = $(item).outerHeight();
				var offset        = $(item).offset();
	 			var top           = Math.round(offset.top - currentHeight - ($(window).height()/3) );
				$('html,body').scrollTop(top);
			}
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
			if(obj.attr('href') && obj.attr('href') != '#' && !has_event_listener) {
				obj.bind('click.knav', function() { document.location = obj.attr('href'); })
			}
			
			// send the click event
			obj.click();
		},
		
		isVisible: function(item) {
			return $(item) && $(item).is(':visible');
		},
		
		belowTheFold: function(item) {
			var fold = $(window).height() + $(window).scrollTop();
			return fold <= $(item).offset().top + 100;
		},
		
		aboveTheFold: function(item) {
			var top = $(window).scrollTop();
			return top >= $(item).offset().top + $(item).height() - 100;
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

