
# Dject-CLI #
#### CLI tooling for setting up and using the Dject DI system ####

## Table Of Contents ##

- [Section 1: Introduction](#user-content-introduction)
- [Section 2: Installation](#user-content-installation)
- [Section 3: Dject CLI Usage](#user-content-dject-cli-usage)
- [Section 4: Version History](#user-content-version-history)

## Introduction ##
Dject CLI is the companion tool to Dject for simplifying setup and use of the Dject dependency injection system.

The goal of this project is to simplify:

- Setup of a Node, require-based Dject configuration
- Setup for compile-at-build Dject configuration file for import-based projects
- Running build-time import-based Dject configuration

    

## Installation ##

- `npm i --global dject-cli`
- `npm i dject-cli --save-dev`
    

## Dject CLI Usage ##

Currently Dject CLI supports configuration creation for Node projects using CommonJS modules. Dject is capable of managing dependencies in a number of scenarios, but we all have to start somewhere, right?

### Getting Help ###

**Command**: `dject --help`

This command will give you information about the current supported behaviors of Dject CLI. The provided information will always reflect the most up-to-date functionality.

### Building a Node CommonJS Container Configuration ###

**Command**: `dject --configure-node-commonjs`

Configure-node-commonjs will prompt the user for configuration options. Sane defaults are provided and providing values for any options is strictly optional.  After running configure-node-commonjs, a file will be written in the current working directory which fully configures Dject to work as a DI container for your node application.

### Creating a Container Builder Config for ES-Next Modules ###

**Command**: `dject --configure-es-module-builder`

Configure-es-module-builder will prompt the user for configuration options. Sane defaults are provided and providing values for any options is strictly optional.  After running Configure-es-module-builder, a file will be written in the current working directory which fully configures Dject CLI to build/rebuild a DI file for your import-based project. This build step will need to be integrated into your project build process.

An example of the generated config is as follows:

```json
{
    "cwd": "app",
    "djectLocation": "dject",
    "destinationPath": "${cwd}${pathSeparator}container",
    "modulePaths": [
        "**${pathSeparator}*.js"
    ]
}
```

#### Configuration Variables ####

There are currently two supported configuration variables: ${cwd} and ${pathSeparator}. Following is how they are used:

- ${cwd} -- This will be replaced with the value in the cwd property of your configuration.
- ${pathSeparator} -- this will be replaced with the path separator for your operating system, '\' in Windows and '/' in all other operating systems.  This is identical to the value in path.sep within Node.

### Building a Container for Imported/ES-Next Modules ###

**Command**: `dject --build-import-container [--config-path ./path/to/config/file.json]

Build-import-container will create a Dject container and load all import-style modules found in configured path.  An example of the generated file is as follows:

```javascript
import dject from 'dject';

import module0 from '../test-imports/subfolder/test2.js';
import module1 from '../test-imports/test1.js';


const container = dject.new();

container.register(module0.value, module0.name);
container.register(module1.value, module1.name);


export default container;
```

All files which are intended to be consumed this way should be in the Dject-style module configuration and export a name and a value, like the following:

```javascript
function myModule(
    dependency1,
    dependency2
) {
    // your module code goes here
}

export default {
    name: 'myModule',
    value: myModule
};
```
    

## Version History ##

**v1.2.0**

- Added import DI container automated build, which consumes the configuration generated from added feature in v1.1.0
- Added configuration path option for choosing a different file name than the default (es-module-config.json).

**v1.1.0**

- Updated default file location to app instead of dependencies for configuration builders
- Introduced configuration construction for ES-Next Module DI container builder -- `dject --configure-es-module-builder`

**v1.0.0**

Initial release. Current feature support:

- Help -- `dject --help`
- Configure Node CommonJS container -- `dject --configure-node-commonjs`
    

    