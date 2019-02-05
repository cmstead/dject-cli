function functionUtils() {
    'use strict';
    
    function compose(func1, func2) {
        return function (...args) {
            return func2(func1.apply(null, args));
        }
    }

    return {
        compose: compose
    };
}

module.exports = functionUtils;