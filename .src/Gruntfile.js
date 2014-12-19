module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		destFolder: "../",
		bowerFolder: "bower_components/",
		srcAssets: "src_assets/",

		// Copy scripts
		copy: {
			fonts: {
				files: [{
					expand: true, //Enable options below
					cwd: 'bower_components/fontawesome/', // base directory in the source path
					src: ['fonts/**/*.*'],
					dest: '<%= destFolder %>/assets/'
				}]
			},
			scripts: {
				files: [{
					expand: true,
					flatten: true,
					src: [
						'<%= bowerFolder %>foundation/js/vendor/modernizr.js',
						'<%= bowerFolder %>foundation/js/vendor/jquery.js',
						'<%= bowerFolder %>foundation/js/vendor/fastclick.js',
						'<%= bowerFolder %>foundation/js/foundation.min.js'
					],
					dest: '<%= destFolder %>/assets/scripts/'
				}, {
					expand: true,
					cwd: '<%= srcAssets %>',
					src: ['scripts/**/*.*'],
					dest: '<%= destFolder %>/assets/'
				}]
			},
		},

		// Compass
		compass: {
			dev: {
				options: {
					force: true, // Allows Compass to overwrite existing files.
					sassDir: '<%= srcAssets %>scss', // The source directory where you keep your Sass stylesheets.
					cssDir: '<%= destFolder %>assets/css', // The target directory where you keep your CSS stylesheets.
					outputStyle: 'expanded', // CSS output mode. Can be: nested, expanded, compact, compressed. #http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
				}
			},
			dist: {
				options: {
					force: true, // Allows Compass to overwrite existing files.
					sassDir: '<%= srcAssets %>scss', // The source directory where you keep your Sass stylesheets.
					cssDir: '<%= destFolder %>assets/css', // The target directory where you keep your CSS stylesheets.
					outputStyle: 'compressed', // CSS output mode. Can be: nested, expanded, compact, compressed. #http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
				}
			}
		},

		// Uglify/compress js
		uglify: {
			app: {
				options: {
					sourceMap: true,
					preserveComments: 'some',
					mangle: true // reduce names of local variables to (usually) single-letters.
				},
				files: {
					'<%= destFolder %>assets/scripts/app.min.js': ['<%= srcAssets %>scripts/app.js']
				}
			}

		},

		// Make a zipfile
		compress: {
			main: {
				options: {
					archive: '../../<%= pkg.name %>.<%= pkg.version %>.zip'
				},
				files: [{
					expand: true,
					src: ['../**/*',
						'!.src/**',
						'!../assets/scripts/app.js',
						'!../README.md',
						'!.gitignore',
						'!desktop.ini',
						'!.DS_Store'
					],
					dest: '<%= pkg.name %>/*' // creates a folder inside the zip; as Wordpress does it
				}]
			}
		},

		// Watch for folder changes
		watch: {
			uglify: {
				files: ['<%= srcAssets %>scripts/app.js'],
				tasks: ['uglify']
			},
			compass: {
				files: ['<%= srcAssets %>scss/**/*.scss'],
				tasks: ['compass:dev']
			},
			copy: {
				files: ['<%= srcAssets %>scripts/**/*.*'],
				tasks: ['newer:copy']
			}
		},

		// Minify images
		imagemin: {
			dynamic: { // Another target
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'src_assets/', // Src matches are relative to this path
					src: ['images/**/*.{png,jpg,gif}'], // Actual patterns to match
					dest: '<%= destFolder %>assets' // Destination path prefix
				}]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['copy', 'compass:dev', 'uglify', 'imagemin', 'watch']);
	grunt.registerTask('zip', ['copy', 'compass:dist', 'uglify', 'imagemin', 'compress']);

};