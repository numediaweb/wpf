<?php

/**
 * WP Foundation setup theme; called by default from functions.php
 *
 * @since WP Foundation 1.0
 */

if (!function_exists('wpf_after_setup_theme')):
	
	/**
	 * WP Foundation setup.
	 *
	 * Set up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support post thumbnails.
	 *
	 * @since WP Foundation 1.0
	 */
	function wpf_after_setup_theme()
	{
		
		/*
		 * Make WP Foundation available for translation.
		 *
		 * Translations can be added to the /languages/ directory.
		*/
		load_theme_textdomain(WPF_TEXT_DOMAIN, WPF__DIR . '/languages');
		
		// Add RSS feed links to <head> for posts and comments.
		add_theme_support('automatic-feed-links');
	}
endif;
 // wpf_after_setup_theme
add_action('after_setup_theme', 'wpf_after_setup_theme');

/**
 * Enqueue scripts and styles for the front end.
 *
 * @since WP Foundation 1.0
 */
function wpf_wp_enqueue_scripts()
{
	
	// Add required styles
	wp_register_style('wpf_required_css', WPF__DIR_URI . 'assets/css/wpf.css', array() , WPF_VERSION);
	wp_enqueue_style('wpf_required_css');
	
	// Add required scripts; modernizr, jquery, fastclick
	//wp_register_script('wpf_requirejs', WPF__DIR_URI . 'assets/scripts/require.js', array() , WPF_VERSION, true);
	//wp_enqueue_script('wpf_requirejs');
}
add_action('wp_enqueue_scripts', 'wpf_wp_enqueue_scripts');