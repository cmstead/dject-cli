function nodeCommonjsBuilder(
    templateReader
) {
    'use strict';

    function buildContainerConfig(configData) {
        const containerTemplate = templateReader.readNodeCommonjsContainerTemplate();
            const dependencyRootDirectory = configData.dependencyRootDirectory;

            return containerTemplate.replace('{{dependencyRootDirectory}}', dependencyRootDirectory);
    }

    return {
        buildContainerConfig: buildContainerConfig
    };
}

module.exports = nodeCommonjsBuilder;