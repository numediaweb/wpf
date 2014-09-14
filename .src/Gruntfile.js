module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		destFolder: "../",
		bowerFolder: "bower_components/",
		srcAssets: "src_assets/",

		// Copy scripts
        copy: {
            scripts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
						'<%= bowerFolder %>foundation/js/vendor/modernizr.js',
						'<%= bowerFolder %>foundation/js/vendor/jquery.js',
						'<%= bowerFolder %>foundation/js/vendor/fastclick.js',
                        '<%= bowerFolder %>foundation/js/foundation.js',
                        '<%= bowerFolder %>requirejs/require.js'
                    ],
                    dest: '<%= destFolder %>/assets/scripts/'
                }, {
                    expand: true, //Enable options below
                    cwd: '<%= srcAssets %>', // base directory in the source path
                    src: ['scripts/**/*.*'],
                    dest: '<%= destFolder %>/assets/'
                }]
            },
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
		},

		// SASS to CSS convertion
		compass: {
			dest: {
				config: 'config.rb',
				force: true
			}
		},

		// Watch for folder changes
		watch: {
			compass: {
				files: ['<%= srcAssets %>scss/**/*.scss'],
				tasks: ['compass']
			},
			imagemin: {
				files: ['<%= srcAssets %>images/**/*.*'],
				tasks: ['newer:imagemin']
			},
			copy: {
				files: ['<%= srcAssets %>scripts/**/*.*'],
				tasks: ['newer:copy']
			}
		},

		// Make a zipfile
		compress: {
			main: {
				options: {
					// archive: function(pkg) {
					// 	console.log(pkg);
					// 	return '../../wpf.'+pkg.version+'.zip';
					// } // destination; parent folder
					archive: '../../wpf.<%= pkg.version %>.zip'
				},
				files: [{
					expand: true,
					src: ['../**/*',
						'!.src/**',
						'!../README.md',
						'!.gitignore',
						'!desktop.ini',
						'!.DS_Store'
					],
					dest: 'wpf/*' // create a folder inside the zip; as Wordpress does it
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
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['copy', 'compass', 'imagemin', 'watch']);
	grunt.registerTask('zip', ['copy', 'compass', 'imagemin', 'compress']);

};