function nodeCommonjsConfigCreator(
    configurationWriter,
    nodeCommonjsBuilder,
    nodeCommonjsPrompt
) {
    'use strict';
    
    function buildAndWriteConfig() {
        nodeCommonjsPrompt.getConfigData(function (error, configData){
            const configFileName = configData.configFileName;
            const configContent = nodeCommonjsBuilder.buildContainerConfig(configData);

            configurationWriter.writeConfigFile(configFileName, configContent);
        });
    }

    return {
        buildAndWriteConfig: buildAndWriteConfig
    };
}

module.exports = nodeCommonjsConfigCreator;