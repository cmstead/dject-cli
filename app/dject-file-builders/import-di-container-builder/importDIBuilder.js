function importDIBuilder(
    importDIConfigLoader,
    importDITemplatePopulator,
    importDITemplateUtils,
    textFileService
) {
    'use strict';

    function writeContainerFile(importDIConfig, fileContent) {
        const destinationPath = importDIConfig.destinationPath;
        return textFileService.writeTextFile(destinationPath, fileContent);
    }

    function buildAndWriteDIFile(userOptions) {
        const importDIConfig = importDIConfigLoader.getImportDIConfig(userOptions);
        const templateCompiler = importDITemplateUtils.getTemplateCompiler(userOptions);
        const fileContent = importDITemplatePopulator.populateDITemplate(importDIConfig, templateCompiler);

        writeContainerFile(importDIConfig, fileContent);
    }

    return {
        buildAndWriteDIFile: buildAndWriteDIFile
    };
}

module.exports = importDIBuilder;