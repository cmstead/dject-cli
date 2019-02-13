function filePathUtils(
    glob
) {
    'use strict';
    
    function loadFilePaths({ modulePaths, cwd }) {
        return modulePaths
            .reduce(function (pathSet, currentPattern) {
                const globPathPattern = path.join(cwd, currentPattern);
                const globbedPaths = glob.sync(globPathPattern);

                return pathSet.concat(globbedPaths);
            }, []);
    }

    return {
        loadFilePaths: loadFilePaths
    };
}

module.exports = filePathUtils;