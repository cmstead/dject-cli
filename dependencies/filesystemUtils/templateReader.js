function templateReader(
    fs,
    path
) {
    'use strict';

    function readTemplateFile(templateFilePath) {
        return fs.readFileSync(path.join(__dirname, templateFilePath), { encoding: 'utf8' });
    }

    function readNodeCommonjsContainerTemplate() {
        const templateFilePath = '../../templates/nodeCommonjsContainer.template.js';
        return readTemplateFile(templateFilePath);
    }

    return {
        readNodeCommonjsContainerTemplate: readNodeCommonjsContainerTemplate
    };
}

module.exports = templateReader;