# grunt-css-injector

> This plugin parse css/scss/sass files, finds all @import directive and inject this files.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-injector --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-injector');
```

## The "css_injector" task

### Overview
In your project's Gruntfile, add a section named `css_injector` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_injector: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.importPath
Type: `String`
Default value: ``

A string value that is used to locate the file specified in the @import directive.

### Usage Examples

#### Example config

```js
grunt.initConfig({
  css_injector: {
    options: {
      importPath: './'
      stopOnMissing: false
    },
    files: {
      'main.css': ['src/css/module1', 'src/css/module2'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-10-28   v0.0.1   Initial release

## License
Copyright (c) 2014 KyKyPy3. Licensed under the MIT license.
