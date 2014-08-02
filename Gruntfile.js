/*
 * grunt-contrib-sass
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */
(function () {
   'use strict';
}());

module.exports = function (grunt) {
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/css/style.css' : 'app/sass/style.scss'
        }
      }
    },
    jshint: {
      all: {
        src: ['Gruntfile.js', 'app/js/**/*.js', 'app/main.js']
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      jshint: {
        files: ['Gruntfile.js', 'app/js/**/*.js', 'app/main.js'],
        task: ['jshint']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default',['watch', 'jshint']);
};
