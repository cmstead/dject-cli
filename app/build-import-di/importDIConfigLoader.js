function importDIConfigLoader(
    functionUtils,
    importDIConfigCleaner,
    importDIDefaults,
    textFileService
) {
    'use strict';

    function getConfigPathOrDefault(userOptions) {
        const configPath = userOptions['config-path'];

        return typeof configPath === 'string'
            ? configPath
            : `${importDIDefaults.configFileName}.json`;
    }

    const loadAndCleanImportDIConfig = functionUtils.foldCompose(
        (configPath) => textFileService.readJsonFile(configPath),
        (diConfig) => importDIConfigCleaner.cleanConfigPathsAndVariables(diConfig)
    );

    const getImportDIConfig = functionUtils.foldCompose(
        (userOptions) => getConfigPathOrDefault(userOptions),
        (configPath) => loadAndCleanImportDIConfig(configPath)
    );


    return {
        getImportDIConfig: getImportDIConfig
    };
}

module.exports = importDIConfigLoader;