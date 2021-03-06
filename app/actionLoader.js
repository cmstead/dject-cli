function actionLoader(
    __container
) {
    'use strict';

    const optionMap = {
        configureCommonjs: 'configure-node-commonjs',
        configureEsModule: 'configure-es-module-builder',
        buildImportContainer: 'build-import-container'
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

    function getDIBuilderAction() {
        const importDIBuilder = buildModule('importDIBuilder');

        return (userConfig) => importDIBuilder.buildAndWriteDIFile(userConfig);
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
        } if (isSelectedOption(optionMap.buildImportContainer)) {
            return getDIBuilderAction();
        } else {
            return getHelpAction();
        }
    }

    return {
        getSelectedAction: getSelectedAction
    };
}

module.exports = actionLoader;