function esModuleBuilder(
    templateReader
) {
    'use strict';

    function buildTemplateKeyReplacer(configData) {
        return function replaceTemplateKeysWithValues(outputContent, currentKey) {
            const replacementKey = `{{${currentKey}}}`;
            const replacementValue = configData[currentKey];

            return outputContent.replace(replacementKey, replacementValue)
        };
    }

    function buildContainerConfig(configData) {
        const containerTemplate = templateReader.readEsModuleContainerTemplate();
        const replaceTemplateKeysWithValues = buildTemplateKeyReplacer(configData);

        return Object.keys(configData)
            .reduce(replaceTemplateKeysWithValues, containerTemplate);
    }

    return {
        buildContainerConfig: buildContainerConfig
    };
}

module.exports = esModuleBuilder;