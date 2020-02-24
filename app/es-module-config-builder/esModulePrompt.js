function esModulePrompt(
    importDIDefaults,
    promptLoader
) {
    'use strict';

    const nodeCommonjsPromptSchema = {
        properties: {
            languageExtension: {
                description: 'What file extension should be used? (js/mjs/ts)',
                type: 'string',
                required: true,
                default: 'js',
                confirm: function(value) {
                    return value === 'js'
                        || value === 'mjs'
                        || value === 'ts'
                }
            },
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
            djectLocation: {
                description: 'Location of Dject module',
                type: 'string',
                required: true,
                default: 'dject'
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
            isNodeApplication: {
                description: 'Is this for a node application',
                type: 'boolean',
                required: true,
                default: false
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
