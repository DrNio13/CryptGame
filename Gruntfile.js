module.exports = function(grunt){

    // Project Configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // configurations for concatenating files
        concat: {
            dist: {
                src: [
                    'src/js/*.js' // All JS in the libs folder
                ],
                dest: 'build/js/app.js'
            }
        },

        uglify: {
            build: {
                src: 'build/js/app.js',
                dest: 'dist/js/app.min.js'
            }
        },

        cssmin:{
          options: {

          }
        },

        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }


    });


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Default tasks of Grunt :)
    grunt.registerTask('default', ['concat', 'uglify']);
};