'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const exec_content_1 = require("./providers/exec-content");
const exec_codelens_1 = require("./providers/exec-codelens");
function getConfig() {
    return vscode_1.workspace.getConfiguration('vscode-graphql-execution', vscode_1.window.activeTextEditor ? vscode_1.window.activeTextEditor.document.uri : null);
}
function activate(context) {
    const outputChannel = vscode_1.window.createOutputChannel('GraphQL Operation Execution');
    const config = getConfig();
    const { debug } = config;
    if (debug) {
        console.log('Extension "vscode-graphql" is now active!');
    }
    const commandShowOutputChannel = vscode_1.commands.registerCommand('vscode-graphql-execution.showOutputChannel', () => {
        outputChannel.show();
    });
    context.subscriptions.push(commandShowOutputChannel);
    const registerCodeLens = () => {
        context.subscriptions.push(vscode_1.languages.registerCodeLensProvider([
            'javascript',
            'typescript',
            'javascriptreact',
            'typescriptreact',
            'graphql',
        ], new exec_codelens_1.GraphQLCodeLensProvider(outputChannel)));
    };
    registerCodeLens();
    vscode_1.workspace.onDidChangeConfiguration(() => {
        registerCodeLens();
    });
    const commandContentProvider = vscode_1.commands.registerCommand('vscode-graphql-execution.contentProvider', async (literal) => {
        const uri = vscode_1.Uri.parse('graphql://authority/graphql');
        const panel = vscode_1.window.createWebviewPanel('vscode-graphql-execution.results-preview', 'GraphQL Execution Result', vscode_1.ViewColumn.Two, {});
        const contentProvider = new exec_content_1.GraphQLContentProvider(uri, outputChannel, literal, panel);
        const registration = vscode_1.workspace.registerTextDocumentContentProvider('graphql', contentProvider);
        context.subscriptions.push(registration);
        const html = await contentProvider.getCurrentHtml();
        panel.webview.html = html;
    });
    context.subscriptions.push(commandContentProvider);
}
exports.activate = activate;
function deactivate() {
    console.log('Extension "vscode-graphql-execution" is now de-active!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map