function importDITemplatePopulator(
    functionUtils,
    filePathUtils
) {
    'use strict';

    const pathSeparator = '/';
    const pathSeparatorPattern = /[\/\\]/g;

    function buildPathTraversal(destinationPath) {
        const directoryCount = destinationPath.split(pathSeparatorPattern).length - 1;

        return functionUtils.repeat(value => `${value}..${pathSeparator}`, directoryCount, '');
    }

    function createImportStatements(filePaths, destinationPath) {
        const traversalPath = buildPathTraversal(destinationPath);
        return filePaths
            .reduce(function (fileContent, filePath, index) {
                return fileContent.concat(`import module${index} from '${traversalPath}${filePath}';\n`);
            }, '');
    }

    function createDIRegisterStatements(filePaths) {
        return filePaths
            .reduce(function (fileContent, _, index) {
                const moduleKey = `module${index}`;
                const moduleName = `${moduleKey}.name`;
                const moduleValue = `${moduleKey}.value`;
                return fileContent.concat(`container.register(${moduleValue}, ${moduleName});\n`);
            }, '');
    }

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
        populateDITemplate: populateDITemplate
    };
}

module.exports = importDITemplatePopulator;