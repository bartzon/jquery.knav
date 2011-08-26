# Simple keyboard navigation for jQuery

Any element with a CSS class of .knav can be navigated using the keyboard, 
using the 'up', 'down' and 'enter' keys.

## Example:
	<a href="/index.html" class="knav">Back to Home</a>

When the element has focus, and the user presses the 'enter' key, a click event will be sent,
which loads the href of the element.  Existing click handlers on the element will not be overwritten.

It's also possible to navigate using wrapper elements. The first anchor with 'knav_link' as CSS class
will be used for the click event, whereas the wrapper element will receive the 'knav_focus' CSS class.

## Example:

### Before focus:
	<div class="article knav">
		<a href="/index.html" class="knav_link">Back to Home</a>
	</div>

### After focus:
	<div class="article knav knav_focus">
		<a href="/index.html" class="knav_link">Back to Home</a>
	</div>

Written by Bart Zonneveld <mail@bartzon.nl>
Repository at http://github.com/bartzon/jquery.knav


