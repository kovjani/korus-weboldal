module.exports = function (grunt) {
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['watch:server', 'watch:fe-ts', 'watch:scss'],
        options: {
          logConcurrentOutput: true,
        },
      },
    },
    watch: {
      server: {
        files: ['src/**/*.ts'],
        tasks: ['shell:buildServer'],
        options: {
          spawn: false,
        },
      },
      'fe-ts': {
        files: ['src/public/ts/**/*.ts'],
        tasks: ['shell:buildFE'],
        options: {
          spawn: false,
        },
      },
      scss: {
        files: ['src/public/scss/**/*.scss'],
        tasks: ['shell:buildSCSS'],
        options: {
          spawn: false,
        },
      },
    },
    shell: {
      buildServer: {
        command: 'tsc',
      },
      buildFE: {
        command:
          'esbuild src/public/ts/**/*.ts --outdir=dist/public/js --bundle --minify',
      },
      buildSCSS: {
        command:
          'sass src/public/scss/event_list.scss dist/public/css/style.css',
      },
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['concurrent:dev']);
};
