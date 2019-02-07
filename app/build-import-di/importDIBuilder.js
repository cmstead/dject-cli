function importDIBuilder(
    functionUtils,
    importDIDefaults,
    path,
    textFileService
) {
    'use strict';

    const pathSeparator = path.sep;
    const pathSeparatorKey = '${pathSeparator}';

    function getConfigPathOrDefault(userOptions) {
        return typeof userOptions.configPath === 'string'
            ? userOptions.configPath
            : `${importDIDefaults.configFileName}.json`;
    }

    function replacePathSeparator(pathStr) {
        return pathStr.replace(pathSeparatorKey, pathSeparator);
    }

    function replaceConfigPathSeparators(importDIConfig) {
        return {
            ['cwd']: replacePathSeparator(importDIConfig.cwd),
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

    const loadAndCleanImportDIConfig = functionUtils.foldCompose(
        (configPath) => textFileService.readJsonFile(configPath),
        (diConfig) => replaceConfigPathSeparators(diConfig),
        (diConfig) => replaceCwdKeys(diConfig)
    );

    function buildAndWriteDIFile(userOptions) {
        const configPath = getConfigPathOrDefault(userOptions);
        const importDIConfig = loadAndCleanImportDIConfig(configPath);

        console.log(importDIConfig);
    }

    return {
        buildAndWriteDIFile: buildAndWriteDIFile
    };
}

module.exports = importDIBuilder;