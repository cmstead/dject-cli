function usageInfo(
    cliConfig
) {
    'use strict';

    return [
        {
            header: 'Dject CLI',
            content: `
Dject CLI (dject-cli on NPM) is a helper utility to quickly, easily
spin up a new Dject container configuration. As use cases for Dject expand,
it is important to streamline the process of getting everything configured.
            `
        },
        {
            header: 'Examples',
            content: `
> dject --configure-node-commonjs
> dject --help
            `
        },
        {
            header: 'Options',
            optionList: cliConfig
        }
    ];
}

module.exports = usageInfo;