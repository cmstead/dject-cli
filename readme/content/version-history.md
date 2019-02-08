<!--bl
(filemeta
    (title "Version History"))
/bl-->

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