function esModuleConfigCreator(
    configurationWriter,
    esModuleBuilder,
    esModulePrompt
) {
    'use strict';

    function buildConfigContent(configData) {
        return esModuleBuilder.buildContainerConfig(configData);
    }
    
    function writeConfigFile(configData, configContent) {
        const configFileName = configData.configFileName;
        
        configurationWriter.writeJSONConfigFile(configFileName, configContent);
    }
    
    function buildAndWriteConfigOrError(error, configData) {
        const logMessage = 'Unable to complete configuration creation. An error occurred';
        
        if (Boolean(error)) {
            console.log(`${logMessage}: ${error.message}`);
        } else {
            const configContent = buildConfigContent(configData);
            writeConfigFile(configData, configContent);
        }
    }

    function buildAndWriteConfig() {
        esModulePrompt.getConfigData(buildAndWriteConfigOrError);
    }

    return {
        buildAndWriteConfig: buildAndWriteConfig
    };
}

module.exports = esModuleConfigCreator;