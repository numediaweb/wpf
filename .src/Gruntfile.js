module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        destFolder: "../",
        bowerFolder: "bower_components/",

        // Uglify/compress js
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    preserveComments: 'some', // false || 'all' || 'some'
                    mangle: true // reduce names of local variables to (usually) single-letters.
                },
                files: {
                    '<%= destFolder %>assets/scripts/wpf.min.js': [ // loads in footer after require
                        '<%= bowerFolder %>foundation/js/vendor/modernizr.js',
                        '<%= bowerFolder %>foundation/js/vendor/jquery.js',
                        '<%= bowerFolder %>foundation/js/vendor/fastclick.js',
                        '<%= bowerFolder %>foundation/js/foundation.js', // loads the Foundation Core and all JavaScript plugins.
                        '<%= bowerFolder %>foundation/js/wpf.js', // customize this file
                    ]
                }
            }
        },

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

        compass: {
            dest: {
                config: 'config.rb',
                force: true
            }
        },

        watch: {
            compass: {
                files: ['src_assets/scss/**/*.scss'],
                tasks: ['compass']
            },

            imagemin: {
                files: ['src_assets/images/**/*.*'],
                tasks: ['newer:imagemin']
            }
        },

        // make a zipfile
        compress: {
            main: {
                options: {
                    archive: function() {
                        return '../../wpf.1.0.zip';
                    } // destination; parent folder
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

    grunt.registerTask('default', ['newer:uglify', 'newer:compass', 'newer:imagemin', 'watch']);
    grunt.registerTask('zip', ['compress']);

};