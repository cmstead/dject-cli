function importDIBuilder(
    importDIDefaults,
    textFileService
) {
    'use strict';

    function getConfigPathOrDefault(userOptions) {
        return typeof userOptions.configPath === 'string'
            ? userOptions.configPath
            : `${importDIDefaults.configFileName}.json`;
    }

    function buildAndWriteDIFile(userOptions) {
        const configPath = getConfigPathOrDefault(userOptions);

        const importDIConfig = textFileService.readJsonFile(configPath);
    }

    return {
        buildAndWriteDIFile: buildAndWriteDIFile
    };
}

module.exports = importDIBuilder;