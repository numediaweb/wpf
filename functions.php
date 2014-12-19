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

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
    _e('Hi there!  I&#39;m just a functions file, not much I can do when called directly.', 'wpf');
    exit;
}

/**
* Global vars
*/
define('WPF_THEME_VERSION', '1.1.0');
define('WPF_TEXT_DOMAIN', 'wpf');
define('WPF__DIR', get_template_directory().'/');
define('WPF__DIR_URI', get_template_directory_uri().'/');
define('WPF__HTML', WPF__DIR.'html/');
define('WPF__ASSETS', WPF__DIR_URI.'assets/');

// Necessary files
require_once WPF__DIR . 'wpf_classes.php';

// Init The plugin in admin or in frontend
add_action('init', array(
    'WPF',
    'init'
));

// Enque necessary files
add_action('wp_enqueue_scripts', array(
    'WPF',
    'wp_enqueue_scripts'
));