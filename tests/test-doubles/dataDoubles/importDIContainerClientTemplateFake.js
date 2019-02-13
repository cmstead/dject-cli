function importDIContainerClientTemplateFake(
    fs
) {
    'use strict';

    const templatePath = './templates/importDIContainer-client.template.js';

    return fs.readFileSync(templatePath, { encoding: 'utf8' });
}

module.exports = importDIContainerClientTemplateFake;