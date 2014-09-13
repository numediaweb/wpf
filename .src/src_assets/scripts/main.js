/*!
 * WP Foundation Library
 * http://github.com/numediaweb/wpf
 *
 * Free to use under the GNU General Public License v2 or later.
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

var moduleList = {};

define(["jquery", "fastclick", "foundation"], function($) {
	// Init foundation scripts
	$(document).foundation();

	// Allow loading of modules
	$('[data-module]').each(function() {
		var scope = this;
		//console.log(requirejs.s.contexts._.config.baseUrl);
		require(['modules/' + $(scope).data('module')], function(module) {
			var moduleDeclaration = new module();
			moduleDeclaration.init(scope);
			moduleList[moduleDeclaration.name] = moduleDeclaration;
		});
	});
});