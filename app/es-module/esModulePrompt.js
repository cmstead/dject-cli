function esModulePrompt(
    promptLoader
) {
    'use strict';
    
    const nodeCommonjsPromptSchema = {
        properties: {
            configFileName: {
                description: 'Name for config file (do not include file extension)',
                type: 'string',
                required: true,
                default: 'es-module-config'
            },
            dependencyRootDirectory: {
                description: 'Root directory for application dependencies',
                type: 'string',
                required: true,
                default: 'app'
            }
        }
    };

    function getConfigData(continuation) {
        promptLoader.promptWithSchema(nodeCommonjsPromptSchema, continuation);
    }

    return {
        getConfigData: getConfigData
    };
}

module.exports = esModulePrompt;