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



        // copy: {
        //     html: {
        //         files: [
        //             // includes files within path
        //             {
        //                 expand: true, //Enable options below
        //                 cwd: 'src/assets/', // base directory in the source path
        //                 src: ['*.html'],
        //                 dest: '<%= destFolder %>'
        //             }
        //         ]
        //     },
        //     scripts: {
        //         files: [{
        //             expand: true,
        //             flatten: true,
        //             src: ['bower_components/modernizr/modernizr.js',
        //                 'bower_components/angularjs/angular.js',
        //                 'bower_components/foundation/js/vendor/jquery.js',
        //                 'bower_components/foundation/js/vendor/fastclick.js',
        //                 'bower_components/foundation/js/foundation.min.js',
        //                 'bower_components/angular-hotkeys/build/hotkeys.js',
        //             ],
        //             dest: '<%= destFolder %>assets/scripts/'
        //         }, {
        //             expand: true, //Enable options below
        //             cwd: 'src/assets/', // base directory in the source path
        //             src: ['scripts/**/*.*'],
        //             dest: '<%= destFolder %>assets/'
        //         }]
        //     },
        // },

        watch: {
            compass: {
                files: ['src_assets/scss/**/*.scss'],
                tasks: ['compass']
            },
            // uglify: {
            //     files: ['src/assets/scripts/**/*.js'],
            //     tasks: ['newer:uglify:main']
            // },
            imagemin: {
                files: ['src_assets/images/**/*.*'],
                tasks: ['newer:imagemin']
            },
            // copy: {
            //     files: ['src/assets/*.html', 'src/assets/images/**/*.*', 'src/assets/scripts/**/*.*', 'src/assets/views/**/*.*'],
            //     tasks: ['newer:copy']
            // }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['newer:uglify', 'newer:compass', 'newer:imagemin', 'watch']);

};