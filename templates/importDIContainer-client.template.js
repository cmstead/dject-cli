{{importStatements}}

const container = window.dject.new({
    dependenciesAsObject: true
});

{{registerStatements}}

window.appContainer = container;

export default container;