'use strict'

const path = require('path');

var config = {
    cwd: path.join(__dirname, 'test-doubles'),
    modulePaths: [
        `**${path.sep}*.js`
    ],
    allowOverride: false,
    eagerLoad: false,
    errorOnModuleDNE: false
};

module.exports = require('dject').new(config);