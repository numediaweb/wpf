<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content.
 *
 * @since WP Foundation 1.0
 */

 wp_footer(); 

 ?>
<!-- <div data-module="example">This loads the example module</div> -->

<script data-main="<?php echo WPF__ASSETS; ?>scripts/main" src="<?php echo WPF__ASSETS; ?>scripts/require.js"></script>
<script type="text/javascript">
    require.config({
		baseUrl: '<?php echo WPF__ASSETS; ?>scripts/',
        paths: {
            "modernizr": "<?php echo WPF__ASSETS; ?>scripts/modernizr",
            "jquery": "<?php echo WPF__ASSETS; ?>scripts/jquery",
            "fastclick": "<?php echo WPF__ASSETS; ?>scripts/fastclick",            
            "foundation": "<?php echo WPF__ASSETS; ?>scripts/foundation"
        },
        shim: {
            'foundation': {
                deps: ['jquery']
            },
            'modernizr': {
            	exports: 'modernizr'
        }
        }
    });
</script>
</body>
</html>