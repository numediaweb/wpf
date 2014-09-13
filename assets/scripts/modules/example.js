define('modules/example', ['jquery'], function($) {
	var widgetDisplay = function() {};
	widgetDisplay.prototype = {
		name: 'Display',
		init: function(scope) {
			"use strict";

			var me = this;

			console.log('example module loaded');
		}
	};

	return widgetDisplay;
});