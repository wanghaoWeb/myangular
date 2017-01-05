'use strict';

var fs = require('fs'),
    extend = require('json-extend');

module.exports = {
    endsWith : endsWith,
    parseVersion : parseVersion,
    isLintFixed : isLintFixed,
    extend: extend
};

function endsWith(str, suffix) {
    return str.indexOf('/', str.length - suffix.length) !== -1;
}

function parseVersion() {
    var version = null;

    var packageJson = fs.readFileSync('./package.json', 'utf8');
    version = JSON.parse(packageJson).version;
    if (version === null) {
        throw new Error('No version is defined');
    }
    return version;
}

function isLintFixed(file) {
	// Has ESLint fixed the file contents?
	return file.eslint !== null && file.eslint.fixed;
}

function extend(target /*, obj1, obj2, ... objN */) {
    util.extend(arguments);
}
