module.exports = function(grunt) {
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['watch:server', 'watch:fe-ts', 'watch:scss'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      server: {
        files: ['src/server/**/*.ts'],
        tasks: ['shell:buildServer'],
        options: {
          spawn: false
        }
      },
      'fe-ts': {
        files: ['src/client/ts/**/*.ts'],
        tasks: ['shell:buildFE'],
        options: {
          spawn: false
        }
      },
      scss: {
        files: ['src/client/scss/**/*.scss'],
        tasks: ['shell:buildSCSS'],
        options: {
          spawn: false
        }
      }
    },
    shell: {
      buildServer: {
        command: 'tsc'
      },
      buildFE: {
        command: 'esbuild src/client/ts/main.ts --bundle --outfile=public/js/bundle.js --minify'
      },
      buildSCSS: {
        command: 'sass src/client/scss/main.scss public/css/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['concurrent:dev']);
};