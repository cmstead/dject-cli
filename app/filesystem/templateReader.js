function templateReader(
    fs,
    functionUtils,
    path
) {
    'use strict';

    const baseDir = path.join(__dirname, '..', '..', 'templates');
    const fileEncoding = { encoding: 'utf8' };

    function buildTemplatePath(templateName) {
        return path.join(baseDir, `${templateName}.template.js`);
    }

    function readTemplateFile(templatePath) {
        return fs.readFileSync(templatePath, fileEncoding);
    }

    const buildPathAndReadFile = functionUtils.compose(
        buildTemplatePath,
        readTemplateFile
    );

    function templateReader(templateName) {
        return () => buildPathAndReadFile(templateName);
    };

    return {
        readImportContainerTemplate: templateReader('importContainer'),
        readNodeCommonjsContainerTemplate: templateReader('nodeCommonjsContainer')
    };
}

module.exports = templateReader;