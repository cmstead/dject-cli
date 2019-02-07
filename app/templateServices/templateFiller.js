function templateFiller () {
    'use strict';

    function fillTemplateKeys(templateContent, keyValueMap) {
        return Object.keys(keyValueMap)
            .reduce(function (fileContent, key){
                const templateKey = `{{${key}}}`;
                const templateValue = keyValueMap[key];

                return fileContent.replace(templateKey, templateValue);
            }, templateContent);
    }

    return {
        fillTemplateKeys: fillTemplateKeys
    };
}

module.exports = templateFiller;