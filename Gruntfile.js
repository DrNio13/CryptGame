//module.exports = function(grunt){
//
//    // Project Configurations
//    grunt.initConfig({
//
//        pkg: grunt.file.readJSON('package.json'),
//
//        // configurations for concatenating files
//        concat: {
//            dist: {
//                src: [
//                    'src/js/*.js' // All JS in the libs folder
//                ],
//                dest: 'js/build/app.js'
//            }
//        },
//
//        uglify: {
//            build: {
//                src: 'js/build/app.js',
//                dest: 'js/build/app.min.js'
//            }
//        },
//
//        watch: {
//            scripts: {
//                files: ['js/*.js'],
//                tasks: ['concat', 'uglify'],
//                options: {
//                    spawn: false
//                }
//            }
//        }
//
//
//    });
//
//
//    // Load the plugins
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//
//    //Default tasks of Grunt :)
//    grunt.registerTask('default', ['concat', 'uglify']);
//};