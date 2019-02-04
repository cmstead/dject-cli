function templateReader(
    fs
) {
    'use strict';

    function readNodeCommonjsContainerTemplate() {
        return fs.readFileSync('./templates/nodeCommonjsContainer.template.js', { encoding: 'utf8' });
    }

    return {
        readNodeCommonjsContainerTemplate: readNodeCommonjsContainerTemplate
    };
}

module.exports = templateReader;