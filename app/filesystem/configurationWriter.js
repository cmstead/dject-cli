function configurationWriter(
    path,
    process,
    textFileService
) {
    'use strict';

    function buildDestinationPath(fullFileName) {
        const destinationDirectory = process.cwd();

        return path.join(destinationDirectory, fullFileName);
    }

    function writeContentToConfig(fullFileName, fileContent) {
        const destinationPath = buildDestinationPath(fullFileName);

        textFileService.writeTextFile(destinationPath, fileContent);
    }

    function writeConfigFile(fileName, fileContent) {
        writeContentToConfig(`${fileName}.js`, fileContent);
    }

    function writeJSONConfigFile(fileName, fileContent) {
        writeContentToConfig(`${fileName}.json`, fileContent);
    }

    return {
        writeConfigFile: writeConfigFile,
        writeJSONConfigFile: writeJSONConfigFile
    };
}

module.exports = configurationWriter;