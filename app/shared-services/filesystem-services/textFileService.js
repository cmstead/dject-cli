function textFileService(
    fs
) {
    'use strict';

    const fileEncoding = { encoding: 'utf8' };

    function readTextFile(filePath) {
        try {
            return fs.readFileSync(filePath, fileEncoding);
        } catch (e) {
            console.log(`An error occurred while reading text file at ${filePath}`);
            console.log(`The error message is: ${e.message}`);
        }
    }

    function readJsonFile(filePath) {
        try {
            return JSON.parse(readTextFile(filePath));
        } catch (e) {
            console.log(`An error occurred while parsing JSON from text file at ${filePath}`);
            console.log(`The error message is: ${e.message}`);
        }
    }

    function writeTextFile(filePath, content) {
        try {
            fs.writeFileSync(filePath, content, fileEncoding);
        } catch (e) {
            console.log(`An error occurred while writing text file at ${filePath}`);
            console.log(`The error message is: ${e.message}`);
        }
    }

    return {
        readJsonFile: readJsonFile,
        readTextFile: readTextFile,
        writeTextFile: writeTextFile
    };
}

module.exports = textFileService;