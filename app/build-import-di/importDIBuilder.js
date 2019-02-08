function importDIBuilder(
    functionUtils,
    glob,
    importDIDefaults,
    path,
    templateFiller,
    templateReader,
    textFileService
) {
    'use strict';

    const pathSeparator = path.sep;
    const pathSeparatorKey = '${pathSeparator}';

    function getConfigPathOrDefault(userOptions) {
        const configPath = userOptions['config-path'];

        return typeof configPath === 'string'
            ? configPath
            : `${importDIDefaults.configFileName}.json`;
    }

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

    const loadAndCleanImportDIConfig = functionUtils.foldCompose(
        (configPath) => textFileService.readJsonFile(configPath),
        (diConfig) => replaceConfigPathSeparators(diConfig),
        (diConfig) => replaceCwdKeys(diConfig)
    );

    function loadFilePaths({ modulePaths, cwd }) {
        return modulePaths
            .reduce(function (pathSet, currentPattern) {
                const globPathPattern = path.join(cwd, currentPattern);
                const globbedPaths = glob.sync(globPathPattern);

                return pathSet.concat(globbedPaths);
            }, []);
    }

    function repeat(operation, times, initialValue) {
        let result = typeof initialValue !== 'undefined' ? initialValue : null;

        for (let i = 0; i < times; i++) {
            result = operation(result);
        }

        return result;
    }

    function buildPathTraversal(destinationPath) {
        const directoryCount = destinationPath.split(/[\/\\]/g).length - 1;

        return repeat(value => `${value}..${path.sep}`, directoryCount, '');
    }

    function createImportStatements(filePaths, destinationPath) {
        const traversalPath = buildPathTraversal(destinationPath);
        return filePaths
            .reduce(function (fileContent, filePath, index) {
                return fileContent.concat(`import module${index} from '${traversalPath}${filePath}';\n`);
            }, '');
    }

    function createDIRegisterStatements(filePaths) {
        return filePaths
            .reduce(function (fileContent, _, index) {
                const moduleKey = `module${index}`;
                const moduleName = `${moduleKey}.name`;
                const moduleValue = `${moduleKey}.value`;
                return fileContent.concat(`container.register(${moduleValue}, ${moduleName});\n`);
            }, '');
    }

    function buildAndWriteDIFile(userOptions) {
        const configPath = getConfigPathOrDefault(userOptions);
        const importDIConfig = loadAndCleanImportDIConfig(configPath);

        const filePaths = loadFilePaths(importDIConfig);
        const importStatements = createImportStatements(filePaths, importDIConfig.destinationPath);
        const registerStatements = createDIRegisterStatements(filePaths);

        const importDITemplate = templateReader.readImportDIContainerTemplate();

        const templateKeyValueMap = {
            djectLocation: importDIConfig.djectLocation,
            importStatements: importStatements,
            registerStatements: registerStatements
        };

        const fileContent = templateFiller.fillTemplateKeys(importDITemplate, templateKeyValueMap);

        textFileService.writeTextFile(importDIConfig.destinationPath, fileContent);
    }

    return {
        buildAndWriteDIFile: buildAndWriteDIFile
    };
}

module.exports = importDIBuilder;