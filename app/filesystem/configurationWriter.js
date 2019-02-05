function configurationWriter(
    fs,
    path,
    process
) {
    'use strict';

    function buildDestinationPath(fullFileName) {
        const destinationDirectory = process.cwd();

        return path.join(destinationDirectory, fullFileName);
    }

    function writeContentToConfig(fullFileName, fileContent) {
        const destinationPath = buildDestinationPath(fullFileName);

        fs.writeFileSync(destinationPath, fileContent, { encoding: 'utf8' });
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