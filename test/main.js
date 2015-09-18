'use strict';

var path            = require('path');
var pkg             = require('../package.json');
var getDependencies = require(path.join(__dirname, '..', pkg.main));
var should          = require('should');

require('mocha');

describe('mdeps', function() {
    it('should extract dependencies of ES5 CommonJS modules', function() {
        getDependencies('var foo = require("bar")').should.eql(['bar']);
    });

    it('should extract dependencies of ES6 modules', function() {
        getDependencies('import foo from "bar"', {ecmaVersion: 6}).should.eql(['bar']);
    });
});
