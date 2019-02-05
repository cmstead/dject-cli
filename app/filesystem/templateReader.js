function templateReader(
    fs,
    functionUtils,
    path
) {
    'use strict';

    const baseDir = path.join(__dirname, '..', '..', 'templates');
    const fileEncoding = { encoding: 'utf8' };

    function buildTemplatePath(templateName, extension = 'js') {
        return path.join(baseDir, `${templateName}.template.${extension}`);
    }

    function readTemplateFile(templatePath) {
        return fs.readFileSync(templatePath, fileEncoding);
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
        readNodeCommonjsContainerTemplate: templateReader('nodeCommonjsContainer')
    };
}

module.exports = templateReader;