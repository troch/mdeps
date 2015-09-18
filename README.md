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
