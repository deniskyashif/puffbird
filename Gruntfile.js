module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'bin/**/*.js', 'config/**/*.js', 'controllers/**/*.js', 'data/**/*.js', 'utilities/**/*.js']
    },
    coffeelint: {
      app: ['public/coffeescripts/**/*.coffee'],
      options: {
        configFile: 'coffeelint.json'
      }
    },
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
        files: ['**/*.js', '!public/**/*', '!./node_modules/**/*'],
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('lint', ['jshint', 'coffeelint']);
  grunt.registerTask('dev', ['express:dev', 'coffee', 'watch']);
  grunt.registerTask('build', ['coffee']);
};