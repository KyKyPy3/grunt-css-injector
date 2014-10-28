/*
 * grunt-css-injector
 *
 *
 * Copyright (c) 2014 KyKyPy3
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    css_injector: {
      default_options: {
        options: {},
        files: {
          'tmp/default_options': 'test/fixtures/default_options'
        }
      },
      custom_options: {
        options: {
          importPath: "./",
          stopOnMissing: false
        },
        files: {
          'tmp/custom_options': 'test/fixtures/default_options'
        }
      },
      missing_with_break_options: {
        options: {
          stopOnMissing: true
        },
        files: {
          'tmp/missing_with_break_options': 'test/fixtures/missing_with_break_options'
        }
      },
      missing_without_break_options: {
        options: {},
        files: {
          'tmp/missing_without_break_options': 'test/fixtures/missing_without_break_options'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'css_injector']);

};
