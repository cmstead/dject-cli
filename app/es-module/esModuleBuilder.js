function esModuleBuilder(
    templateReader
) {
    'use strict';
    
    function buildContainerConfig(configData) {
        const containerTemplate = templateReader.readEsModuleContainerTemplate();
            const dependencyRootDirectory = configData.dependencyRootDirectory;

            return containerTemplate.replace('{{dependencyRootDirectory}}', dependencyRootDirectory);
    }

    return {
        buildContainerConfig: buildContainerConfig
    };
}

module.exports = esModuleBuilder;