<!--bl
(filemeta
    (title "Dject CLI Usage"))
/bl-->

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