function templateReader(
    functionUtils,
    path,
    textFileService
) {
    'use strict';

    const baseDir = path.join(__dirname, '..', '..', 'templates');

    function buildTemplatePath(templateName, extension = 'js') {
        return path.join(baseDir, `${templateName}.template.${extension}`);
    }

    function readTemplateFile(templatePath) {
        return textFileService.readTextFile(templatePath);
    }

    const buildPathAndReadFile = functionUtils.compose(
        buildTemplatePath,
        readTemplateFile
    );

    function templateReader(templateName, extension) {
        return () => buildPathAndReadFile(templateName, extension);
    };

    return {
        readEsModuleContainerTemplate: templateReader('esModuleContainer', 'json'),
        readImportDIContainerTemplate: templateReader('importDIContainer'),
        readNodeCommonjsContainerTemplate: templateReader('nodeCommonjsContainer')
    };
}

module.exports = templateReader;