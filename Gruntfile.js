module.exports = function(){

    // Project Configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // configurations for concatenating files
        concat: {
            dist: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js'
            }
        }

    });


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default tasks of Grunt :)
    grunt.registerTask('default', ['concat', 'uglify']);
};