'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _acorn = require('acorn');

exports.default = getDependencies;


var defaultOpts = {
    ecmaVersion: 5,
    module: 'common'
};

function getDependencies(contents) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;

    var ast = (0, _acorn.parse)(contents, { sourceType: 'module', ecmaVersion: opts.ecmaVersion });

    var deps = ast.body.map(extractDependenciesFromNode(opts)).reduce(function (dependencies, deps) {
        return dependencies.concat(deps);
    });

    return deps;
}

function extractDependenciesFromNode(opts, node) {
    if (opts.ecmaVersion === 5 && opts.module === 'common') {
        return extractCommonJsDepenciesFromNode;
    }

    if (opts.ecmaVersion === 6) {
        return extractImportDependenciesFromNode;
    }
}

function extractCommonJsDepenciesFromNode(node) {
    if (node.type !== 'VariableDeclaration') return [];
    return node.declarations.filter(isModuleDependency).map(function (declaration) {
        return declaration.init.arguments[0].value;
    });
}

function extractImportDependenciesFromNode(node) {
    if (node.type !== 'ImportDeclaration') return [];
    return [node.source.value];
}

function isModuleDependency(declaration) {
    if (!declaration.init || declaration.init.type !== 'CallExpression') return false;
    var name = declaration.init.callee.name;

    if (name === 'require') return true;
}
module.exports = exports['default'];

