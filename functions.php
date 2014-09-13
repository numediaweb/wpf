<?php
/**
* WP Foundation default functions file
*
* Set up the theme and provides some helper functions, which are used in the
* theme as custom template tags. Others are attached to action and filter
* hooks in WordPress to change core functionality.
*
* When using a child theme you can override certain functions (those wrapped
* in a function_exists() call) by defining them first in your child theme's
* functions.php file. The child theme's functions.php file is included before
* the parent theme's file, so the child theme functions would be used.
*
* @link http://codex.wordpress.org/Theme_Development
* @link http://codex.wordpress.org/Child_Themes
*
* Functions that are not pluggable (not wrapped in function_exists()) are
* instead attached to a filter or action hook.
*
* For more information on hooks, actions, and filters,
* @link http://codex.wordpress.org/Plugin_API
*
* @since WP Foundation 1.0
*/

/**
* DEFINITIONS
*/

define('WPF_VERSION', '0.0.1');
define('WPF_TEXT_DOMAIN', 'wpf');
define('WPF__DIR', get_template_directory().'/');
define('WPF__DIR_URI', get_template_directory_uri().'/');
define('WPF__INCLUDES', WPF__DIR.'includes/');

/**
* INCLUDES
*/
require WPF__INCLUDES . '/_setup.php';