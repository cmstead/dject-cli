function djectDynamicDoubleLoader() {
    'use strict';

    const buildMethodLoader = (topLevelFunction) =>
        (propertyName) =>
            (...args) =>
                topLevelFunction[propertyName].apply(topLevelFunction, args);

    function buildTestDoubleAPI(topLevelFunction) {
        const methodLoader = buildMethodLoader(topLevelFunction);

        return Object.keys(topLevelFunction)
            .reduce(function(apiResult, propertyKey) {
                apiResult[propertyKey] = methodLoader(propertyKey);
                return apiResult;
            }, {});
    }

    function buildDjectTestDouble(moduleName) {
        const injectableModule = Function('buildTestDoubleAPI', `
            return function ${moduleName}() {
                return buildTestDoubleAPI(${moduleName});
            }
        `)(buildTestDoubleAPI);

        injectableModule.appendProperty = function(key, value) {
            injectableModule[key] = value;
            return injectableModule;
        }

        return injectableModule;
    }

    return {
        buildDjectTestDouble: buildDjectTestDouble
    };
}

module.exports = djectDynamicDoubleLoader;