module.exports = function(grunt) {
    grunt.initConfig({
        express: {
            options: {
                port: 3030
            },
            dev: {
                options: {
                    script: 'bin/www'
                }
            }
        },
        watch: {
            express: {
                files: ['**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false 
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', [
        'express:dev',
        'watch'
    ]);
};