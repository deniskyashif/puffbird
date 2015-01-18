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
                cwd:'./public/coffeescripts/',
                src: '**/*.coffee',
                dest: './public/javascripts/',
                ext: '.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/stylesheets/puffbird.css': ['public/stylesheets/puffbird.min.css']
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
            },
            coffee: {
                files: ['./public/coffeescripts/**/*.coffee'],
                tasks: ['coffee:compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'express:dev',
        'coffee',
        'uglify',
        'watch'
    ]);
};