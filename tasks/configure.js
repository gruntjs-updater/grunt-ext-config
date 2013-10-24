/*
 * grunt-ext-config
 * https://github.com/stephanebachelier/grunt-ext-config
 *
 * Copyright (c) 2013 stephanebachelier
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var ini = require('ini');
  var extensionPattern = /\.([^\.]+)$/i;
  var _ = grunt.util._;

  var configuration = grunt.configuration || {};

  grunt.getConfig = function (key, merge) {
    var tokens = key.split('.');
    var config = configuration;
    var length = tokens.length;
    var i = length;
    while (i--) {
      config = config[tokens[length - 1 - i]];
    }

    if (merge) {
      return _.merge(config, configuration.defaults);
    }
    else {
      return config;
    }
  };

  grunt.registerMultiTask('configure', 'Load external configuration', function() {
    var config = {};
    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      file.src.forEach(function (f) {
        var match = f.match(extensionPattern);
        if (!match) {
          grunt.log.error('file not supported.');
          return;
        }
        var parse = (function() {
          switch(match[1]) {
            case 'json': return readJson;
            case 'yaml': return readYaml;
              // linter complains about no break statement
            case 'ini': return readIni;
            default: return readIni;
          }
        })();
        configuration = grunt.util._.extend(configuration, parse(f) || {});
      });
    });

    grunt.configuration = configuration;
  });

  var readJson = function (file) {
    try {
      return grunt.file.readJSON(file);
    } catch(e) {
      return;
    }
  };

  var readYaml = function (file) {
    try {
      return grunt.file.readYAML(file);
    } catch(e) {
      return;
    }
  };

  var readIni = function (file) {
    try {
      return ini.parse(grunt.file.read(file));
    } catch(e) {
      return;
    }
  };
};
