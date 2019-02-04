function cliConfig() {
    'use strict';
    
    return [
        {
            name: 'help',
            alias: 'h',
            type: Boolean,

            description: 'Get help on how to use Dject CLI'
        },
        { 
            name: 'configure-node-commonjs',
            type: Boolean,

            description: 'Create a new Node configuration for (require-style) CommonJS modules'
        }
      ];
}

module.exports = cliConfig;