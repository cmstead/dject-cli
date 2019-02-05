function esModuleConfigCreator(
    configurationWriter,
    esModuleBuilder,
    esModulePrompt
) {
    'use strict';

    function buildAndWriteConfig() {
        esModulePrompt.getConfigData(function (error, configData){
            const configFileName = configData.configFileName;
            const configContent = esModuleBuilder.buildContainerConfig(configData);

            configurationWriter.writeJSONConfigFile(configFileName, configContent);
        });
    }

    return {
        buildAndWriteConfig: buildAndWriteConfig
    };
}

module.exports = esModuleConfigCreator;