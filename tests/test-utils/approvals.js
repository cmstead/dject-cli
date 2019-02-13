const approvals = require('approvals');
const approvalsConfigFactory = require('approvals-config-factory');

const approvalsDirectory = './tests/approvals';
const approvalsConfig = approvalsConfigFactory.buildApprovalsConfig({
    reporter: 'kdiff3'
});

module.exports = () => approvals.mocha(approvalsDirectory).configure(approvalsConfig);