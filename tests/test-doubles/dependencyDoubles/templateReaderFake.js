function templateReaderFake(
    djectDynamicDoubleLoader,
    importDIContainerClientTemplateFake,
    sinon
) {
    'use strict';

    const readImportDIContainerClientTemplateFake = () => importDIContainerClientTemplateFake;

    return djectDynamicDoubleLoader
        .buildDjectTestDouble('templateReader')
        .appendProperty(
            'readImportDIContainerClientTemplate',
            sinon.stub().callsFake(readImportDIContainerClientTemplateFake)
        );
}

module.exports = templateReaderFake;