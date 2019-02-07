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

    return {
        compose: compose,
        foldCompose: foldCompose
    };
}

module.exports = functionUtils;