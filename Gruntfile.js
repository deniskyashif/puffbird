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
        coffee: {
            compile: {
                expand: true,
                flatten: false,
                cwd: './public/coffeescripts/',
                src: '**/*.coffee',
                dest: './public/javascripts/',
                ext: '.js'
            }
        },
        watch: {
            express: {
                files: ['**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            coffee: {
                files: ['./public/coffeescripts/**/*.coffee'],
                tasks: ['coffee:compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('dev', ['express:dev', 'coffee', 'watch']);
    grunt.registerTask('build', ['coffee']);
};