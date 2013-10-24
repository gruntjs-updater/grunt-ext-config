# grunt-configure

WARNING: this plugin is in alpha stage.

> Load external configuration

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-configure --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-configure');
```
or (better), use `matchdep` plugin and add this line before `grunt.initConfig`:

```
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
```

## The "configure" task

### Overview
In your project's Gruntfile, add a section named `configure` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  configure: {
    options: {
      // Task-specific options go here.
    },
    bar: {
      src: ['.env'] // load configuration from ini file if no extension provided
    },
    foo: {
      src: ['.env.ini'] // load configuration from ini file
    },
    baz: {
    	src: ['.env.json'] // load configuration from json file
    },
    foobar: {
    	src: ['.env.yaml'] // load configuration from yaml file
    }
  },
})
```

### Options

None.

### Usage Examples

#### Target different environments

```js
grunt.initConfig({
  configure: {
    options: {},
    dev: {
      src: ['.env.dev.json']
    },
    prod: {
    	src: ['.env.prod.json']
    }
  },
})
```

## TODO

 * complete test suite
 * add documentation

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
