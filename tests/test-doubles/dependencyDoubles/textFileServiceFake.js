function textFileServiceFake(
    djectDynamicDoubleLoader,
    sinon
) {
    'use strict';

    return djectDynamicDoubleLoader
        .buildDjectTestDouble('textFileService')
        .appendProperty('readJsonFile', sinon.stub())
        .appendProperty('writeTextFile', sinon.stub());
}

module.exports = textFileServiceFake;