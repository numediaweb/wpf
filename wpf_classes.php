<?php

/* REEF Class*/
class WPF {
	private static $initiated = false;
	
	public static function init() {
		if (!self::$initiated) {
			
			if (did_action('plugins_loaded')) self::theme_textdomain();
			else add_action('plugins_loaded', array(
				__CLASS__,
				'theme_textdomain'
			) , 99);
			
			self::init_class();
		}
	}
	
	/**
	 * Load language files
	 */
	public static function theme_textdomain() {
		load_theme_textdomain('reef', false, dirname(plugin_basename(__FILE__)) . '/languages/');
	}
	
	/**
	 * Initializes WordPress hooks
	 */
	private static function init_class() {
		self::$initiated = true;
	}
	
	/**
	 * Enqueue scripts and styles for the front end.
	 *
	 */
	public static function wp_enqueue_scripts() {
		
		// Add required styles
		wp_register_style('wpf_app', WPF__ASSETS . 'css/app.css', array());
		wp_enqueue_style('wpf_app');
		
		// Add required scripts
		wp_register_script('jquery', WPF__ASSETS . 'scripts/jquery.js', array() , false, true);
		wp_enqueue_script('jquery');
		wp_register_script('modernizr', WPF__ASSETS . 'scripts/modernizr.js', array(
			'jquery'
		) , false, true);
		wp_enqueue_script('modernizr');
		wp_register_script('fastclick', WPF__ASSETS . 'scripts/fastclick.js', array(
			'jquery'
		) , false, true);
		wp_enqueue_script('fastclick');
		wp_register_script('foundation', WPF__ASSETS . 'scripts/foundation.min.js', array(
			'modernizr',
			'jquery'
		) , false, true);
		wp_enqueue_script('foundation');
		
		// Localize the app script with our data.
		wp_register_script('wpf_app', WPF__ASSETS . 'scripts/app.min.js', array() , false, true);
		$vars_array = array(
			'ajaxurl' => admin_url('admin-ajax.php')
		);
		wp_localize_script('wpf_app', 'wpf', $vars_array);
		wp_enqueue_script('wpf_app');
	}
}
