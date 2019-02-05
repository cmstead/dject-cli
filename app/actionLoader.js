function actionLoader(
    __container
) {
    'use strict';

    const optionMap = {
        configureCommonjs: 'configure-node-commonjs',
        configureEsModule: 'configure-es-module-builder'
    };

    function checkOptionOn(userOptions) {
        return function isOption(optionName) {
            return userOptions[optionName];
        };
    }

    function buildModule(moduleName) {
        return __container.build(moduleName);
    }

    function getConfigBuilderAction(builderName) {
        const commonJsAction = buildModule(builderName);

        return () => commonJsAction.buildAndWriteConfig();
    }

    function getHelpAction() {
        const helpAction = buildModule('help');

        return () => helpAction.displayHelpInfo();
    }

    function getSelectedAction(userOptions) {
        const isSelectedOption = checkOptionOn(userOptions);

        if (isSelectedOption(optionMap.configureCommonjs)) {
            return getConfigBuilderAction('nodeCommonjsConfigCreator');
        } if (isSelectedOption(optionMap.configureEsModule)) {
            return getConfigBuilderAction('esModuleConfigCreator');
        } else {
            return getHelpAction();
        }
    }

    return {
        getSelectedAction: getSelectedAction
    };
}

module.exports = actionLoader;