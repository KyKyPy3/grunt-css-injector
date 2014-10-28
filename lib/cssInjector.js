/*
 * grunt-css-injector
 *
 *
 * Copyright (c) 2014 KyKyPy3
 * Licensed under the MIT license.
 */

'use strict';

var util  = require('util');
var async = require('async');
var chalk = require('chalk');
var path  = require('path');

var IMPORT_REGEX = /@import\s+['"](.*)['"]/i;

function cssInjector(task) {
  /*jshint validthis:true */
  this.task = task;

  this.options = task.options(cssInjector.defaults);
}

cssInjector.prototype.run = function(grunt) {

  var options = this.options;

  this.task.files.forEach(function (file) {

    file.src.filter(function (filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn(util.format('Source file "%s" not found.', filepath));
        return false;
      } else {
        return true;
      }
    }).forEach(function (filepath) {
      var dest = file.dest || filepath;
      var fileSource = grunt.util.normalizelf(grunt.file.read(filepath));
      var lines = fileSource.split(grunt.util.linefeed);

      async.map(lines, function(line, callback){
        var match = line.match(IMPORT_REGEX);

        if (match) {
          var injectingFilePath = options.importPath ? options.importPath + match[1] : match[1];

          grunt.log.debug(util.format("checking file exists %s"), injectingFilePath);

          if (!grunt.file.exists(injectingFilePath)) {
            if (options.stopOnMissing) {
              callback(util.format("Missing injecting file %s.", injectingFilePath), line);
            } else {
              callback(null, line);
            }

            return;
          }

          grunt.log.subhead(util.format("Injecting %s into %s..", injectingFilePath, filepath));

          var css_source = grunt.file.read(injectingFilePath);
          callback(null, css_source);
        } else {
          callback(null, line);
        }
      }, function(err, results){
        if (err) {
          grunt.fatal(err);
          return;
        }

        grunt.log.ok(util.format('Saving results to %s.'), dest);

        grunt.file.write(dest, results.join(grunt.util.linefeed));
      });
    });
  });

};

// Default plugin options
// ==============================
cssInjector.defaults = {
  importPath: null,
  stopOnMissing: false
};

cssInjector.taskName = 'css_injector';
cssInjector.taskDescription = 'Parse CSS files and inject another css files from @import directive.';

cssInjector.registerWithGrunt = function(grunt) {

  grunt.registerMultiTask(cssInjector.taskName, cssInjector.taskDescription, function() {
    var task = new cssInjector(this);

    task.run(grunt);
  });

};

module.exports = cssInjector;
