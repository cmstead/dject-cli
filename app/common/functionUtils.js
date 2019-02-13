function functionUtils() {
    'use strict';

    function compose(...functions) {
        if (functions.length === 0) {
            throw new Error('Function composition requires at least one function');
        } else if (functions.length === 1) {
            return functions[0];
        } else {
            return function (...args) {
                return functions[1](functions[0].apply(null, args));
            };
        }
    }

    function foldCompose(...functions) {
        if (functions.length < 3) {
            return compose.apply(null, functions);
        } else {
            return functions.reduce(compose);
        }
    }

    function repeat(operation, times, initialValue) {
        let result = typeof initialValue !== 'undefined' ? initialValue : null;

        for (let i = 0; i < times; i++) {
            result = operation(result);
        }

        return result;
    }
    
    return {
        compose: compose,
        foldCompose: foldCompose,
        repeat: repeat
    };
}

module.exports = functionUtils;