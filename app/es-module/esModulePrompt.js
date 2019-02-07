function esModulePrompt(
    importDIDefaults,
    promptLoader
) {
    'use strict';
    
    const nodeCommonjsPromptSchema = {
        properties: {
            configFileName: {
                description: 'Name for config file (do not include file extension)',
                type: 'string',
                required: true,
                default: importDIDefaults.configFileName
            },
            dependencyRootDirectory: {
                description: 'Root directory for application dependencies',
                type: 'string',
                required: true,
                default: importDIDefaults.dependencyRootDirectory
            },
            destinationPath: {
                description: 'Directory to write output file to',
                type: 'string',
                required: true,
                default: '${cwd}'
            },
            destinationFileName: {
                description: 'Name of file to write (do not include file extension)',
                type: 'string',
                required: true,
                default: "container"
            },

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