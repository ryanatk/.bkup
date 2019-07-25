# Flow for Visual Studio Code
[![Backers on Open Collective](https://opencollective.com/flow-for-vscode/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/flow-for-vscode/sponsors/badge.svg)](#sponsors)

This extension adds [Flow](https://flow.org/) support for VS Code. Flow is a static type checker, designed to find type errors in JavaScript programs. Follow the official guide to [get started](https://flow.org/en/docs/getting-started/).

<p align="center">
  <img src="https://github.com/flowtype/flow-for-vscode/raw/master/readme/flow-main.gif"/>
</p>

Want to help make Flow in VS Code really shine? If this is you, you can get [set up for development](https://github.com/flowtype/flow-for-vscode/blob/master/CONTRIBUTING.md) easily.

## Installation

Search for "Flow Language Support" in the VS Code extensions panel or install through [the marketplace](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode).

## Setup
* Make sure you have a `.flowconfig` file somewhere in your project.
* Make sure you are able to run the `flow` command from the command line (or see [Configuration](#configuration) to customize the command or use NPM packaged flow).
* Set `javascript.validate.enable` option to `false` **or** completely disable the built-in TypeScript extension for your project (see gif below):

<p align="center">
  <img src="https://github.com/flowtype/flow-for-vscode/raw/master/readme/flow-disable-tsc.gif"/>
</p>

## Configuration
You can specify a configuration by amending the VS Code `settings.json` file. Access this through Preferences → Settings. You must reload VS Code after installing this extension for these settings to take affect.

* `flow.useNPMPackagedFlow` (default: true) allows using flow from your node_modules for VSCode. **Warning**: Setting to true is a security risk. When you open a project we will immediately run code contained within it.
  > **Note:** Plugin will look for node_modules in `flowconfigDir` and root of `workspaceFolder`

* `flow.pathToFlow` (default: 'flow') Absolute path to flow binary.
  ```javascript
    {
      // You can use ${workspaceFolder} it will be replaced by workspaceFolder path
      "flow.pathToFlow": "${workspaceFolder}/node_modules/.bin/flow"

      // You can also use var ${flowconfigDir} it will be replaced by flowconfigDir path
      "flow.pathToFlow": "${flowconfigDir}/node_modules/.bin/flow"

      // or use some absolute path
      "flow.pathToFlow": "/home/test/some_path/flow"
    }
  ````
  > **Note:** Path is normalized and ".cmd" is added if needed.

* `flow.useBundledFlow` (default: true) fallback to flow bundled with this plugin if nothing else works.

* `flow.showUncovered` (default: false) If `true` will show uncovered code by default. You can also toggle it later by using command or clicking on status bar widget.

* `flow.coverageSeverity` (default: 'info'): Type coverage diagnostic severity.

  > **Note:** Only supported when useLSP: true.

* `flow.lazyMode` (default: null): to support flow [lazyMode](https://flow.org/en/docs/lang/lazy-modes/)

  > **Note:** Only supported when useLSP: true.

* `flow.stopFlowOnExit` (default: true) stop flow server on exit from Project.

* `flow.useCodeSnippetOnFunctionSuggest` (default: true) Complete functions with their parameter signature.

* `flow.runOnEdit` (default: true) If `true` will run flow on every edit, otherwise will run only when changes are saved.

  > **Note:** Partial support when useLSP: true will only show syntax errors.

* `flow.showStatus` (default: true) If `true` will display a spinner in the status-bar while flow is type checking.

  > **Note:** Not supported when useLSP: true. In lsp mode you can use status-bar widget to view status.

* `flow.runOnAllFiles` (default: false) Run Flow on all files, No need to put `//@flow comment` on top of files.

  > **Note:** Not supported when useLSP: true. You can use flowconfig option [all](https://flow.org/en/docs/config/options/#toc-all-boolean).

* `flow.useLSP` (default: true) Turn off to switch from the official Flow Language Server implementation to talking directly to flow.

  > **Note**: useLSP: true requires `flow >= 0.75`

* `flow.enabled` (default: true) you can disable flow for some Project for example.

## Features

* Supports multiple flowconfig and vscode multi-root workspaces (required `useLSP: true`)
* IntelliSense
* Go to Definition / Peek Definition
* Diagnostics (Errors, Warnings)
* Hover type information
* Rename (required `useLSP: true`)
* Toggle-able Code Coverage reports

<p align="center">
  <img src="https://github.com/flowtype/flow-for-vscode/raw/master/readme/code-coverage.gif"/>
</p>

## Commands
* `Toggle display of uncovered areas`: Show|hide coverage uncovered areas.
* `Restart Client`: Restarts flow client.
* `Show Client Status`: Show current status of client.
* `Log Client Debug Info`: Log client debug info in output panel.
* `Show Output Channel`: Opens plugin output pannel.

## Known Issues

* If you're having problems with syntax highlighting try [Babel Javascript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel).

## Debugger configuration

First, follow the [instructions](https://code.visualstudio.com/Docs/editor/debugging#_launch-configurations) to setup your launch configuration file, `launch.json`.

To use [flow-remove-types](https://github.com/flowtype/flow-remove-types):

* Follow the [flow-remove-type Quick Start](https://flowtype.org/docs/running.html#flow-remove-types-quick-start).
* In `launch.json`, add `"runtimeArgs": ["-r", "flow-remove-types/register"]` to the "launch" configuration.

To use [Babel](https://babeljs.io):

* Follow the [Babel Quick Start](https://flowtype.org/docs/running.html#babel-quick-start).
* Install [babel-register](http://babeljs.io/docs/core-packages/babel-register/).
* In `.babelrc`, add `"retainLines": true`.
* In `launch.json`, add `"runtimeArgs": ["-r", "babel-register"]` to the "launch" configuration.

## About

* Lsp mode is built using `flow lsp` (flow official language-server-protocol implementation)
* Non lsp mode is built on top of [Nuclide](https://github.com/facebook/nuclide)'s Flow support.

## Contributing

* please refer to [CONTRIBUTING.md](https://github.com/flowtype/flow-for-vscode/blob/master/CONTRIBUTING.md)

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](https://github.com/flowtype/flow-for-vscode/blob/master/CONTRIBUTING.md)].
<a href="graphs/contributors"><img src="https://opencollective.com/flow-for-vscode/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/flow-for-vscode#backer)]

<a href="https://opencollective.com/flow-for-vscode#backers" target="_blank"><img src="https://opencollective.com/flow-for-vscode/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/flow-for-vscode#sponsor)]

<a href="https://opencollective.com/flow-for-vscode/sponsor/0/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/1/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/2/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/3/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/4/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/5/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/6/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/7/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/8/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/flow-for-vscode/sponsor/9/website" target="_blank"><img src="https://opencollective.com/flow-for-vscode/sponsor/9/avatar.svg"></a>



## License
[See here](https://github.com/flowtype/flow-for-vscode/blob/master/LICENSE)
