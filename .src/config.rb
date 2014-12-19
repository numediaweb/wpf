# http://compass-style.org/help/documentation/configuration-reference/

#Folder settings
http_path = "/"     	#The path to the project when running within the web server. Defaults to "/".
relative_assets = false      		#Indicates whether the compass helper functions should generate relative urls from the generated css to assets, or absolute urls using the http path for that asset type.
css_dir = "../assets/css"     		#where the CSS will saved
sass_dir = "src_assets/scss" 		#where our .scss files are
images_dir = "src_assets/images" 	#the folder with your images
http_images_path = "../images" 		#The full http path to images on the web server. Defaults to http_path + "/" + images_dir
http_fonts_path = "../fonts" 		#The full http path to images on the web server. Defaults to http_path + "/" + images_dir

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed 			# After dev :compressed

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# Obviously
preferred_syntax = :scss

# Import other SASS
add_import_path "bower_components/fontawesome/scss"
add_import_path "bower_components/foundation/scss"