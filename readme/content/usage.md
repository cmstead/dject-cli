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