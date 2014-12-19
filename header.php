<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <body">
 *
 * @since WP Foundation 1.0
 */
?><!doctype html>
<!--[if IE 9]><html class="lt-ie10" lang="en" > <![endif]-->
<!--[if IE 10]><html class="ie10" lang="en" > <![endif]-->
<html class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<title><?php wp_title( '|', true, 'right' ); ?></title>

	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>