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

    const pathSeparator = '/';
    const pathSeparatorPattern = /[\/\\]/g;
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
        importDIConfig.cwd = replacePathSeparator(importDIConfig.cwd);
        importDIConfig.djectLocation = replacePathSeparator(importDIConfig.djectLocation);
        importDIConfig.destinationPath = replacePathSeparator(importDIConfig.destinationPath);
        importDIConfig.modulePaths = importDIConfig.modulePaths.map(replacePathSeparator);
        
        return importDIConfig;
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
        const directoryCount = destinationPath.split(pathSeparatorPattern).length - 1;

        return repeat(value => `${value}..${pathSeparator}`, directoryCount, '');
    }

    function cleanModulePath(filePath) {
        const scriptExtensionPattern = /\.(js|ts)$/i;
        const extensionOffset = filePath.length - 3;
        return scriptExtensionPattern.test(filePath) ? filePath.substr(0, extensionOffset) : filePath;
    }

    function createImportStatements(filePaths, destinationPath) {
        const traversalPath = buildPathTraversal(destinationPath);
        return filePaths
            .reduce(function (fileContent, filePath, index) {
                return fileContent.concat(`import module${index} from '${traversalPath}${cleanModulePath(filePath)}';\n`);
            }, '');
    }

    function createRegisterValue(index) {
        const moduleKey = `module${index}`;
        const moduleName = `${moduleKey}.name`;
        const moduleValue = `${moduleKey}.value`;

        return `
Object.keys(${moduleKey}).filter(key => key !== 'name').forEach((key) => ${moduleValue}[key] = ${moduleKey}[key]);
container.register(${moduleValue}, ${moduleName});
`;
    }

    function createDIRegisterStatements(filePaths) {
        return filePaths
            .reduce(function (fileContent, _, index) {
                return fileContent.concat(createRegisterValue(index));
            }, '');
    }

    function getContainerTemplate(userOptions) {
        return userOptions.isNodeApplication
            ? templateReader.readImportDIContainerNodeTemplate()
            : templateReader.readImportDIContainerClientTemplate();
    }

    function buildAndWriteDIFile(userOptions) {
        const configPath = getConfigPathOrDefault(userOptions);
        const importDIConfig = loadAndCleanImportDIConfig(configPath);

        const filePaths = loadFilePaths(importDIConfig);
        const importStatements = createImportStatements(filePaths, importDIConfig.destinationPath);
        const registerStatements = createDIRegisterStatements(filePaths);

        const importDITemplate = getContainerTemplate(importDIConfig);

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