function configurationWriter(
    fs,
    path,
    process
) {
    'use strict';
    
    function writeConfigFile(fileName, fileContent) {
        const destinationDirectory = process.cwd();
        const destinationPath = path.join(destinationDirectory, `${fileName}.js`);

        fs.writeFileSync(destinationPath, fileContent, { encoding: 'utf8' });
    }

    return {
        writeConfigFile: writeConfigFile
    };
}

module.exports = configurationWriter;