function importDIConfigCleaner(
    functionUtils
) {
    'use strict';

    const pathSeparator = '/';
    const pathSeparatorKey = '${pathSeparator}';

    function replacePathSeparator(pathStr) {
        return pathStr.replace(pathSeparatorKey, pathSeparator);
    }

    function replaceConfigPathSeparators(importDIConfig) {
        return {
            ['cwd']: replacePathSeparator(importDIConfig.cwd),
            ['djectLocation']: replacePathSeparator(importDIConfig.djectLocation),
            ['destinationPath']: replacePathSeparator(importDIConfig.destinationPath),
            ['modulePaths']: importDIConfig.modulePaths.map(replacePathSeparator)
        };
    }

    function replaceCwdKeys(diConfig) {
        const cwd = diConfig.cwd;
        const cwdKey = '${cwd}';

        diConfig.destinationPath = diConfig.destinationPath.replace(cwdKey, cwd);
        diConfig.modulePaths = diConfig.modulePaths.map((path) => path.replace(cwdKey, cwd));

        return diConfig;
    }

    const cleanConfigPathsAndVariables = functionUtils.foldCompose(
        (diConfig) => replaceConfigPathSeparators(diConfig),
        (diConfig) => replaceCwdKeys(diConfig)
    )


    return {
        cleanConfigPathsAndVariables: cleanConfigPathsAndVariables,
        replaceConfigPathSeparators: replaceConfigPathSeparators,
        replaceCwdKeys: replaceCwdKeys
    };
}

module.exports = importDIConfigCleaner;