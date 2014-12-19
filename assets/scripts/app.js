var appREEF = (function(document, $) {
    var docElem = document.documentElement,
        product_id = null,

        /**
         * Initialise the app
         *
         * @return {[type]} [description]
         */
        _init = function() {
            _userAgentInit();
        },

        /**
         * Sets the user agent on the HTML tag; Which allows you to be able to target
         * very specific browsers on very specific platforms with CSS:
         * html[data-useragent*="Chrome/13.0"][data-platform="Win32"]{ ... }
         *
         * @return {[type]} [description]
         */
        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },

        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _toggleAddToCartBtn = function(showOrHide) {
            if (showOrHide) {
                $('#reefman_add_to_cart_btn').slideDown();
                $('#reefman_reset_variations_btn').slideDown();
            } else {
                $('#reefman_add_to_cart_btn').slideUp();
                $('#reefman_reset_variations_btn').slideUp();
            }
        },

        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _showLoadingImage = function(show, me) {
            if (show) {
                // Show loading
                $(me).slideUp('fast', function() {

                    $(me).prev().hide().removeClass('hide').slideDown('slow');
                });
            } else {
                // Hide loading
                $(me).prev().addClass('hide').hide('fast', function() {

                    $(me).slideDown('slow');
                });
            }
        },

        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        /*_notify = function(text) {
            $('#nw_reefman .nw_notifications').show().text(text);
        },*/


        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _loading = function(loading) {
            if (loading) {
                $('#nw_reefman .reefman_form').stop().fadeTo('slow', 0.01, function() {
                    $('#nw_reefman ._loading').stop().slideDown('fast', function() {
                        $('#nw_reefman ._single_variation').removeClass('active');
                    });
                });
            } else {
                $('#nw_reefman ._loading').stop().slideUp('fast', function() {
                    $('#nw_reefman .reefman_form').stop().fadeTo('slow', 1);
                });
            }
        },


        /**
         * Update form elements styles and display
         *
         * @return {[type]} [description]
         */
        _refreshView = function() {
            // Update total variations number
            var total_variations = $('._single_variation').length;
            $('._total_variations').text(total_variations);

            // Change display according to variations
            if (parseInt(total_variations) > 0) {
                // Hide notice
                $("form.reefman_form ._no_product_selected").slideUp('fast');

                // Show add to cart btn
                _toggleAddToCartBtn(true);

                // Update label
                $('._total_variations').removeClass('secondary');
                $('._total_variations').addClass('success');
            } else {
                // Hide add to cart btn
                _toggleAddToCartBtn(false);

                // Update label
                $('._total_variations').addClass('secondary');
                $('._total_variations').removeClass('success');

                // Hide notice
                $("form.reefman_form ._no_product_selected").slideDown('slow');

            }
        },

        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _addAccordionItem = function(me) {
            var current_settings = {},
                all_variations = $('form.reefman_form').data('product-variations');

            // Add to settings array
            current_settings[$(me).data('attr-name')] = $(me).data('attr-value');

            // Variations that match
            var variation = _find_matching_variations(all_variations, current_settings).shift();
            if (variation) {
                // Build the form
                var formData = new FormData();
                formData.append('action', 'add_variation_to_accordion');
                formData.append('product_id', product_id);
                formData.append('variation_id', variation.variation_id);
                formData.append('test', 'this"helper " is awk');
                formData.append('variation', JSON.stringify(variation));

                // Submit form
                $.ajax({
                    url: nw.ajaxurl,
                    data: formData,
                    dataType: 'html',
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('FATAL ERROR: ' + JSON.stringify(jqXHR) + ' ' + textStatus + ' ' + errorThrown);
                    },
                    success: function(data, textStatus, jqXHR) {
                        $("form.reefman_form dl.accordion").append(data);

                        // Refresh price
                        _refreshView();

                        // update add to cart button state
                        _toggleAddToCartBtn(true);

                        // Disable loading
                        _loading(false);
                    }
                });

            } else {
                console.log('Couldn\'t find a variation!', variation);
                // Stop loading animation
                _loading(false);
            }

        },

        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _find_matching_variations = function(product_variations, settings) {
            var matching = [];

            for (var i = 0; i < product_variations.length; i++) {
                var variation = product_variations[i];
                var variation_id = variation.variation_id;

                if (_variations_match(variation.attributes, settings)) {
                    matching.push(variation);
                }
            }

            return matching;
        },


        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _variations_match = function(attrs1, attrs2) {
            var match = true;

            for (var attr_name in attrs1) {
                if (attrs1.hasOwnProperty(attr_name)) {
                    var val1 = attrs1[attr_name];
                    var val2 = attrs2[attr_name];

                    if (val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2) {
                        match = false;
                    }
                }
            }

            return match;
        },


        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _uploadImage = function(me) {
            var variation_images = $(me)[0].files;

            var formData = new FormData();
            formData.append('action', 'add_variation_image');
            formData.append('product_id', product_id);
            formData.append('variation_image', variation_images[0]);

            // Submit form
            $.ajax({
                url: nw.ajaxurl,
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('FATAL ERROR: ' + JSON.stringify(jqXHR) + ' ' + textStatus + ' ' + errorThrown);
                },
                success: function(data, textStatus, jqXHR) {
                    var variation_image = '#image_variations_' + $(me).data('rand');
                    if (data.state === 'success') {

                        // Show loading image
                        _showLoadingImage(false, me);

                        // Set the image ID
                        $(me).next().val(data.attachment_id);

                        // Hide the upload field, and then, show image
                        $(me).hide('slow', function() {
                            $(variation_image).attr('src', data.attachment_src[0]);
                            $(variation_image).attr('width', data.attachment_src[1]);
                            $(variation_image).attr('height', data.attachment_src[2]);
                            $(variation_image).removeClass('hide').show('slow');
                        });
                        //console.log(data);

                    } else {
                        // Hide image
                        $(variation_image).addClass('hide');

                        // Hide loading image
                        _showLoadingImage(false, me);

                        // Reset file
                        $(me).val('');

                        console.log(data.message);
                        console.log(data);
                    }
                    
                    // Show add to cart btn
                    _toggleAddToCartBtn(true);
                }
            });
        },


        /**
         * Desc
         *
         * @return {[type]} [description]
         */
        _addToCart = function() {
            // Build the form
            var formElement = document.getElementById("reefman_form");
            var formData = new FormData(formElement);
            formData.append('action', 'add_product_variations_to_cart');
            formData.append('product_id', product_id);

            // Submit form
            $.ajax({
                url: nw.ajaxurl,
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('FATAL ERROR: ' + JSON.stringify(jqXHR) + ' ' + textStatus + ' ' + errorThrown);

                    // disable the submit button
                    $('#reefman_add_to_cart_btn').prop('disabled', false).removeClass('disabled').find('i').addClass('hide');

                },
                success: function(data, textStatus, jqXHR) {
                    if (data.state === 'success') {
                        //console.log(data);
                        // Redirect to checkout
                        window.location.href = data.cart_url;
                    } else {
                        console.log("An error occured; do not process form.");
                        console.log(data);
                    }
                }
            });
        };

    return {
        // Init the application
        init: _init,

        /**
         * Called on single client details view page
         */
        onSingleProductPage: function() {

            // Hide loading
            $('#nw_reefman ._loading').hide();

            // Disable form submit on enter
            $('form.reefman_form').on('keyup keypress', function(event) {
                // Prevent submit on Enter
                var code = event.keyCode || event.which;
                if (code == 13) {
                    event.preventDefault();
                    console.log("Enter pressed; ignore form submit!");
                    return false;
                }
            });

            // First, lets set the product ID
            product_id = parseInt($('form.reefman_form').data('product-id'));

            // update add to cart button state            
            $('#reefman_add_to_cart_btn').hide();
            $('#reefman_reset_variations_btn').hide();

            // Hide notifications
            $('#nw_extended_calculations .nw_notifications').hide();

            // If custom number is choosen
            $('#nw_reefman').on('click', '._add_product_variation', function(event) {
                var me = event.target;

                // Ignit loading
                _loading(true);

                // get variation price
                //_getVariationPrice();

                // Add a new variation
                _addAccordionItem(me);

                event.preventDefault();
            });

            // Listen to image clicks on each variation
            $('#nw_reefman').on('click', '.image_elements ._set_attribute', function(event) {
                event.preventDefault();

                var me = event.target,
                    target_input_name = $(me).data('sets'),
                    target_product_id = $(me).data('id');

                // Set selected class for clicked image and hide it for other
                $(me).parents('ul').find('._set_attribute').not(me).each(function() {
                    $(this).removeClass('selected');
                });
                $(me).toggleClass('selected');

                // Set element value
                if ($(me).is(".selected"))
                    $('input[name="' + target_input_name + '"]').val(target_product_id);
                else
                    $('input[name="' + target_input_name + '"]').val('');
            });

            // Toggle engraving method; image or text?
            $('form.reefman_form').on('change', '._engraving', function(event) {
                var me = event.target;

                // Hide all elements
                $(me).parent().find('._engraving').each(function() {
                    $(this).nextAll('input').first().addClass('hide');
                });

                // Show next input
                $(me).nextAll('input').first().removeClass('hide');

                // Hide the loading image on text engraving
                if ($(me).data('what') === 'text') {
                    // Hide the loading
                    $(me).parent().find('._uploading_image').addClass('hide');

                    // Reset the field field
                    $(me).parent().find('._uploading_image').next().addClass('hide').show().val('');

                    // Show add to cart btn
                    _toggleAddToCartBtn(true);
                }
                //console.log($(me).data('what'));
                //console.log( $(me).nextAll('input').first());

            });

            // Upload image field
            $('form.reefman_form').on('change', 'input[type="file"]', function(event) {
                var me = event.target;

                // Hide add to cart btn
                _toggleAddToCartBtn(false);

                // Show loading image
                _showLoadingImage(true, me);

                // Upload image
                _uploadImage(me);

            });


            // Reset all variations
            $('#reefman_reset_variations_btn').click(function(event) {
                event.preventDefault();

                // Remove all variations from accordion
                $('#nw_reefman ._single_variation').parent('dd').slideUp('slow', function() {
                    $(this).remove();

                    // Refresh price
                    _refreshView();
                });
            });

            // Submit the form
            $('form.reefman_form').submit(function(event) {
                event.preventDefault();

                // disable the submit button
                $('#reefman_add_to_cart_btn').prop('disabled', true).addClass('disabled').find('i.hide').removeClass('hide');

                // get variation price and process add to cart form
                _addToCart(true);
            });


        }
    };
})(document, jQuery);

jQuery(document).ready(function($) {
    // Include foundation
    $(document).foundation();

    // Init the app
    appREEF.init();

    // Call page spcefic functions
    if ($('.single').is('.single-product')) {
        appREEF.onSingleProductPage();
    }
});