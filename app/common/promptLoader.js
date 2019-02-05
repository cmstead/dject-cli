function promptLoader(prompt) {
    'use strict';
    
    function promptWithSchema(schema, continuation) {
        prompt.start();
        prompt.message = '';

        prompt.get(schema, continuation);
    }

    return {
        promptWithSchema: promptWithSchema
    };
}

module.exports = promptLoader;