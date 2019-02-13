const container = require('../container');
const testContainer = require('./testContainer');

const approvals = require('./test-utils/approvals');
const { assert } = require('chai');
const sinon = require('sinon');

approvals();

describe('Import DI Container Builder', function () {

    let importDIBuilder;
    let textFileServiceFake;
    let userOptions;

    beforeEach(function () {
        const appContainer = container.new();

        userOptions = testContainer.build('userOptionsFake');
        const importDIConfigFake = testContainer.build('importDIConfigFake');

        const globFake = testContainer.build('globFake');

        textFileServiceFake = testContainer.build('textFileServiceFake');
        textFileServiceFake.readJsonFile.callsFake(() => importDIConfigFake);

        const templateReaderFake = testContainer.build('templateReaderFake');

        appContainer.register(globFake);
        appContainer.register(templateReaderFake);
        appContainer.register(textFileServiceFake);

        importDIBuilder = appContainer.build('importDIBuilder');
    });

    describe('buildAndWriteDIFile', function () {
        it('loads configuration file by default name when no path is specified', function () {
            importDIBuilder.buildAndWriteDIFile(userOptions);

            assert.equal(textFileServiceFake.readJsonFile.args[0][0], 'es-module-config.json');
        });

        it('loads configuration file from provided path when specified', function () {
            const configPath = './foo/bar/baz.json';

            userOptions['config-path'] = configPath;
            importDIBuilder.buildAndWriteDIFile(userOptions);

            assert.equal(textFileServiceFake.readJsonFile.args[0][0], configPath);
        });

        it('writes a new import DI file', function () {
            importDIBuilder.buildAndWriteDIFile(userOptions);

            const argsToWriteText = textFileServiceFake.writeTextFile.args;

            this.verify(JSON.stringify(argsToWriteText, null, 4));
        });
    });

});