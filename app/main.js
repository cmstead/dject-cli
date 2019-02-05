function main(
    actionLoader,
    cliArgs
) {
    'use strict';

    function runUserAction() {
        const userOptions = cliArgs.getCliArgs();
        const selectedAction = actionLoader.getSelectedAction(userOptions);

        selectedAction(userOptions);
    }

    return {
        runUserAction: runUserAction
    };
}

module.exports = main;