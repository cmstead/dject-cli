function importDITemplateUtils(
    filePathUtils,
    functionUtils,
    templateReader,
    templateUtils
) {
    'use strict';

    function getContainerTemplate(userOptions) {
        return userOptions.isNodeApplication
            ? templateReader.readImportDIContainerNodeTemplate()
            : templateReader.readImportDIContainerClientTemplate();
    }

    const getTemplateCompiler = functionUtils.foldCompose(
        (userOptions) => getContainerTemplate(userOptions),
        (importDITemplate) => templateUtils.buildTemplateCompiler(importDITemplate)
    );

    function buildTemplateKeyValueMap(importDIConfig) {
        const filePaths = filePathUtils.loadFilePaths(importDIConfig);
        const importStatements = createImportStatements(filePaths, importDIConfig.destinationPath);
        const registerStatements = createDIRegisterStatements(filePaths);

        return {
            djectLocation: importDIConfig.djectLocation,
            importStatements: importStatements,
            registerStatements: registerStatements
        };

    }

    const populateDITemplate = (importDIConfig, templateCompiler) => {
        return functionUtils.foldCompose(
            () => buildTemplateKeyValueMap(importDIConfig),
            (templateKeyValueMap) => templateCompiler(templateKeyValueMap)
        )();
    };



    return {
        getContainerTemplate: getContainerTemplate,
        getTemplateCompiler: getTemplateCompiler,
        populateDITemplate: populateDITemplate
    };
}

module.exports = importDITemplateUtils;