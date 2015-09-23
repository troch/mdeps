[![npm version](https://badge.fury.io/js/mresolve.svg)](http://badge.fury.io/js/mdeps)
[![Build Status](https://travis-ci.org/troch/mresolve.svg)](https://travis-ci.org/troch/mdeps?branch=master)
[![Coverage Status](https://coveralls.io/repos/troch/mresolve/badge.svg?branch=master&service=github)](https://coveralls.io/github/troch/mdeps?branch=master)

# mdeps

> A module dependency extractor

This module extracts module dependencies from a module. ES6 modules, CommonJS ES5 modules are supported.

```javascript
import getDependencies from 'mdeps';

getDependencies('import foo from "bar"', {ecmaVersion: 6});
// => [ 'bar' ]

getDependencies('var foo = require("bar");var foo2 = require("baz");');
// => [ 'bar', 'baz' ]
```
