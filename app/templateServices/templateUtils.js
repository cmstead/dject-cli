function templateUtils() {
    'use strict';

    function fillTemplateKeys(templateContent, keyValueMap) {
        return Object.keys(keyValueMap)
            .reduce(function (fileContent, key){
                const templateKey = `{{${key}}}`;
                const templateValue = keyValueMap[key];

                return fileContent.replace(templateKey, templateValue);
            }, templateContent);
    }

    const buildTemplateCompiler = (importDITemplate) =>
        (templateKeyValueMap) =>
            fillTemplateKeys(importDITemplate, templateKeyValueMap)

    return {
        buildTemplateCompiler: buildTemplateCompiler
    };
}

module.exports = templateUtils;