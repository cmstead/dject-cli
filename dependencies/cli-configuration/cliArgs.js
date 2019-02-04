function cliArgs(
    cliConfig,
    commandLineArgs
) {
    'use strict';
    
    function getCliArgs() {
        return commandLineArgs(cliConfig);
    }

    return {
        getCliArgs: getCliArgs
    };
}

module.exports = cliArgs;