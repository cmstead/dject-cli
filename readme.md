
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
    

## Version History ##

**v1.0.0**

Initial release. Current feature support:

- Help -- `dject --help`
- Configure Node CommonJS container -- `dject --configure-node-commonjs`
    

    