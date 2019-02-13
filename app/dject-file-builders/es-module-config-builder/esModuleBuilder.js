function esModuleBuilder(
    templateReader,
    templateUtils
) {
    'use strict';

    function buildContainerConfig(configData) {
        const containerTemplate = templateReader.readEsModuleContainerTemplate();

        return templateUtils.fillTemplateKeys(containerTemplate, configData);
    }

    return {
        buildContainerConfig: buildContainerConfig
    };
}

module.exports = esModuleBuilder;