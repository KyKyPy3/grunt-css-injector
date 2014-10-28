'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_injector = {
  setUp: function (done) {
    // setup here if necessary

    done();
  },
  default_options: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['css_injector:default_options'],
    }, function(err, result, code) {
      var actual = grunt.file.read('tmp/default_options');
      var expected = grunt.file.read('test/expected/default_options');
      test.equal(actual, expected, 'should describe what the default behavior is.');

      test.done();
    });
  },
  custom_options: function (test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['css_injector:custom_options'],
    }, function(err, result, code) {
      var actual = grunt.file.read('tmp/custom_options');
      var expected = grunt.file.read('test/expected/custom_options');
      test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

      test.done();
    });
  },
  missing_with_break_options: function(test) {
    test.expect(2);

    grunt.util.spawn({
      grunt: true,
      args: ['css_injector:missing_with_break_options'],
    }, function(err, result, code) {
      test.equal(code, '1', 'should describe with error code 1.');
      test.ok(result.stdout.indexOf('Fatal error: Missing injecting file') !== -1, 'should describe with error "Missing file".');

      test.done();
    });
  },
  missing_without_break_options: function(test) {
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['css_injector:missing_without_break_options'],
    }, function(err, result, code) {
      var actual = grunt.file.read('tmp/missing_without_break_options');
      var expected = grunt.file.read('test/expected/missing_without_break_options');
      test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

      test.done();
    });
  }
};
