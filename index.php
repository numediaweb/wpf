<?php

/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one
 * of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query,
 * e.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @since WP Foundation 1.0
 */

get_header();

/**
 * FOR QUICKSTART TEMPLATES, CHECK:
 * http://foundation.zurb.com/templates.html
 *
 * SOME AWESOME BUILDING CODE BLOCKS HERE TOO:
 * http://patterntap.com/code
 */
?>
     
 <?php require_once WPF__HTML . 'homepage.html'; ?>

    
<?php
get_footer();
