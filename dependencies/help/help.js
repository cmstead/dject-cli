function help(
    commandLineUsage,
    usageInfo
) {
    'use strict';
    
    function displayHelpInfo() {
        const usageContent = commandLineUsage(usageInfo);

        console.log(usageContent);
    }

    return {
        displayHelpInfo: displayHelpInfo
    };
}

module.exports = help;