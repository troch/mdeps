import {parse} from 'acorn';

export default getDependencies;

let defaultOpts = {
    ecmaVersion: 5,
    module: 'common'
};

function getDependencies(contents, opts = defaultOpts) {
    let ast = parse(contents, {sourceType: 'module', ecmaVersion: opts.ecmaVersion});

    let deps = ast.body
        .map(extractDependenciesFromNode(opts))
        .reduce((dependencies, deps) => dependencies.concat(deps));

    return deps;
}

function extractDependenciesFromNode(opts, node) {
    if (opts.ecmaVersion === 5 && opts.module === 'common') {
        return extractCommonJsDepenciesFromNode
    }

    if (opts.ecmaVersion === 6) {
        return extractImportDependenciesFromNode;
    }
}

function extractCommonJsDepenciesFromNode(node) {
    if (node.type !== 'VariableDeclaration') return [];
    return node.declarations
        .filter(isModuleDependency)
        .map(declaration => declaration.init.arguments[0].value);
}

function extractImportDependenciesFromNode(node) {
    if (node.type !== 'ImportDeclaration') return [];
    return [node.source.value];
}

function isModuleDependency(declaration) {
    if (!declaration.init || declaration.init.type  !== 'CallExpression') return false;
    let {name} = declaration.init.callee;
    if (name === 'require') return true;
}

