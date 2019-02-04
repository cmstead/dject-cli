function actionLoader(
    __container
) {
    'use strict';

    const optionMap = {
        configureCommonjs: 'configure-node-commonjs'
    };

    function checkOptionOn(userOptions) {
        return function isOption(optionName) {
            return userOptions[optionName];
        };
    }

    function buildModule(moduleName) {
        return __container.build(moduleName);
    }

    function getSelectedAction(userOptions) {
        const isSelectedOption = checkOptionOn(userOptions);

        if (isSelectedOption(optionMap.configureCommonjs)) {
            const commonJsAction = buildModule('nodeCommonjsConfigCreator');

            return () => commonJsAction.buildAndWriteConfig();
        } else {
            const helpAction = buildModule('help');

            return () => helpAction.displayHelpInfo();
        }
    }

    return {
        getSelectedAction: getSelectedAction
    };
}

module.exports = actionLoader;