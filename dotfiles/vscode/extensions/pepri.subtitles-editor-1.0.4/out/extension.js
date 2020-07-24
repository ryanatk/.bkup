'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const https = require("https");
const languages = require("./languages.json");
const url_1 = require("url");
const timeRegex = /^([+\-]?)(\d{2}):(\d{2}):(\d{2})[,.](\d{3})$/;
const sequenceRegex = /^([+\-]?)(\d+)$/;
const timeMappingRegex = /^\d{2}:\d{2}:\d{2}[,.]\d{3} -> \d{2}:\d{2}:\d{2}[,.]\d{3}$/;
const timelineRegex = /^\d{2}:\d{2}:\d{2}[,.]\d{3} --> \d{2}:\d{2}:\d{2}[,.]\d{3}$/;
const doNotTranslateRegex = /^(?:\s*|(\d+)|\d{2}:\d{2}:\d{2}[,.]\d{3} --> \d{2}:\d{2}:\d{2}[,.]\d{3})$/;
const emptyRegex = /^\s*$/;
function parseTime(value) {
    if (!value) {
        return 0;
    }
    const match = value.match(timeRegex);
    if (!match) {
        return 0;
    }
    return (match[1] === '-' ? -1 : 1) * (Number(match[2]) * 60 * 60 + Number(match[3]) * 60 + Number(match[4]) + Number(match[5]) / 1000);
}
function pad2(value) {
    return value < 10 ? '0' + String(value) : String(value);
}
function pad3(value) {
    if (value < 10) {
        return '00' + String(value);
    }
    else if (value < 100) {
        return '0' + String(value);
    }
    else {
        return String(value);
    }
}
function formatTime(value) {
    const hours = Math.floor(value / (60 * 60));
    value -= hours * 60 * 60;
    const minutes = Math.floor(value / 60);
    value -= minutes * 60;
    const seconds = Math.floor(value);
    value -= seconds;
    const milliseconds = Math.round(value * 1000);
    return (value < 0 ? '-' : '') + pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds) + ',' + pad3(milliseconds);
}
function shift() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (typeof textEditor === 'undefined') {
            return false;
        }
        const inputBox = {
            placeHolder: 'Time shift',
            prompt: 'Enter the desired time shift. Use negative value if subtitles are late.',
            value: '00:00:00,000',
            valueSelection: [6, 8],
            validateInput: (value) => __awaiter(this, void 0, void 0, function* () { return timeRegex.test(value) ? null : 'Time has to be in format ±00:00:00,000.'; })
        };
        const value = yield vscode.window.showInputBox(inputBox);
        if (typeof value === 'undefined') {
            return false;
        }
        const offset = parseTime(value);
        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = textEditor.document.uri;
        const selections = !textEditor.selection.isEmpty
            ? textEditor.selections
            : [new vscode.Selection(textEditor.document.positionAt(0), textEditor.document.lineAt(textEditor.document.lineCount - 1).range.end)];
        for (const selection of selections) {
            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; ++lineIndex) {
                const line = textEditor.document.lineAt(lineIndex);
                if (timelineRegex.test(line.text)) {
                    const timeline = line.text.split(' --> ')
                        .map(x => formatTime(parseTime(x) + offset));
                    workspaceEdit.replace(documentUri, line.range, timeline.join(' --> '));
                }
            }
        }
        yield vscode.workspace.applyEdit(workspaceEdit);
        return true;
    });
}
function renumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (typeof textEditor === 'undefined') {
            return false;
        }
        const inputBox = {
            placeHolder: 'Sequence start index',
            prompt: 'Enter the start index to renumber the sequence.',
            value: '1',
            valueSelection: [0, 1],
            validateInput: (value) => __awaiter(this, void 0, void 0, function* () { return sequenceRegex.test(value) ? null : 'Offset has to be a number.'; })
        };
        const value = yield vscode.window.showInputBox(inputBox);
        if (typeof value === 'undefined') {
            return false;
        }
        let offset = Number(value);
        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = textEditor.document.uri;
        const selections = !textEditor.selection.isEmpty
            ? textEditor.selections
            : [new vscode.Selection(textEditor.document.positionAt(0), textEditor.document.lineAt(textEditor.document.lineCount - 1).range.end)];
        for (const selection of selections) {
            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; ++lineIndex) {
                const line = textEditor.document.lineAt(lineIndex);
                const previousLineText = lineIndex > 0 ? textEditor.document.lineAt(lineIndex - 1).text : '';
                if (sequenceRegex.test(line.text) && emptyRegex.test(previousLineText)) {
                    workspaceEdit.replace(documentUri, line.range, String(offset));
                    ++offset;
                }
            }
        }
        yield vscode.workspace.applyEdit(workspaceEdit);
        return true;
    });
}
function reorder() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (typeof textEditor === 'undefined') {
            return false;
        }
        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = textEditor.document.uri;
        const selections = !textEditor.selection.isEmpty
            ? textEditor.selections
            : [new vscode.Selection(textEditor.document.positionAt(0), textEditor.document.lineAt(textEditor.document.lineCount - 1).range.end)];
        for (const selection of selections) {
            const frames = [];
            let frame = null;
            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; ++lineIndex) {
                const line = textEditor.document.lineAt(lineIndex);
                const previousLineText = lineIndex > 0 ? textEditor.document.lineAt(lineIndex - 1).text : '';
                if (sequenceRegex.test(line.text) && emptyRegex.test(previousLineText)) {
                    frame = {
                        lineIndex,
                        sequence: Number(line.text),
                        lines: [line]
                    };
                    frames.push(frame);
                }
                else {
                    if (!frame) {
                        frame = {
                            lineIndex,
                            sequence: Number.NEGATIVE_INFINITY,
                            lines: []
                        };
                        frames.push(frame);
                    }
                    frame.lines.push(line);
                }
            }
            frames.sort((a, b) => a.sequence !== b.sequence ? a.sequence - b.sequence : a.lineIndex - b.lineIndex);
            const lines = frames.reduce((acc, frame) => { acc.push(...frame.lines.map(line => line.text + '\n')); return acc; }, []);
            workspaceEdit.replace(documentUri, selection, lines.join(''));
        }
        yield vscode.workspace.applyEdit(workspaceEdit);
        return true;
    });
}
function findFirstTime(textDocument, lineNumbers) {
    for (const lineNumber of lineNumbers) {
        const line = textDocument.lineAt(lineNumber);
        if (timelineRegex.test(line.text)) {
            const timeline = line.text.split(' --> ');
            return timeline[0];
        }
    }
    return null;
}
function linearCorrection() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (typeof textEditor === 'undefined') {
            return false;
        }
        const keys = Array.from(Array(textEditor.document.lineCount).keys());
        const firstTime = findFirstTime(textEditor.document, keys) || '00:00:00,000';
        const secondTime = findFirstTime(textEditor.document, keys.reverse()) || '00:00:00,000';
        const firstInputBox = {
            placeHolder: 'Time #1',
            prompt: 'Enter first time for subtitle that appears early in the video in format old time -> correct time.',
            value: `${firstTime} -> ${firstTime}`,
            valueSelection: [16, 28],
            validateInput: (value) => __awaiter(this, void 0, void 0, function* () { return timeMappingRegex.test(value) ? null : 'Time has to be in format 00:00:00,000 -> 00:00:00,000.'; })
        };
        const secondInputBox = Object.assign({}, firstInputBox, { placeHolder: 'Time #2', prompt: 'Enter second time for subtitle that appears late in the video in format old time -> correct time.', value: `${secondTime} -> ${secondTime}` });
        const firstValue = yield vscode.window.showInputBox(firstInputBox);
        if (typeof firstValue === 'undefined') {
            return false;
        }
        const secondValue = yield vscode.window.showInputBox(secondInputBox);
        if (typeof secondValue === 'undefined') {
            return false;
        }
        const firstMapping = firstValue.split(' -> ').map(parseTime);
        const secondMapping = secondValue.split(' -> ').map(parseTime);
        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = textEditor.document.uri;
        const selections = !textEditor.selection.isEmpty
            ? textEditor.selections
            : [new vscode.Selection(textEditor.document.positionAt(0), textEditor.document.lineAt(textEditor.document.lineCount - 1).range.end)];
        const factor = (secondMapping[1] - firstMapping[1]) / (secondMapping[0] - firstMapping[0]);
        for (const selection of selections) {
            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; ++lineIndex) {
                const line = textEditor.document.lineAt(lineIndex);
                if (timelineRegex.test(line.text)) {
                    const timeline = line.text.split(' --> ').map(x => formatTime((parseTime(x) - firstMapping[0]) * factor + firstMapping[1]));
                    workspaceEdit.replace(documentUri, line.range, timeline.join(' --> '));
                }
            }
        }
        yield vscode.workspace.applyEdit(workspaceEdit);
        return true;
    });
}
function translate() {
    return __awaiter(this, void 0, void 0, function* () {
        const textEditor = vscode.window.activeTextEditor;
        if (typeof textEditor === 'undefined') {
            return false;
        }
        const languagesByCode = languages;
        const items = Object.keys(languagesByCode)
            .map(code => ({
            label: `${languagesByCode[code]}`,
            detail: code
        }));
        const quickPickOpts = {
            placeHolder: 'Language',
            matchOnDetail: true
        };
        const value = yield vscode.window.showQuickPick(items, quickPickOpts);
        if (typeof value === 'undefined') {
            return false;
        }
        const language = value.detail;
        const workspaceEdit = new vscode.WorkspaceEdit();
        const documentUri = textEditor.document.uri;
        const selections = !textEditor.selection.isEmpty
            ? textEditor.selections
            : [new vscode.Selection(textEditor.document.positionAt(0), textEditor.document.lineAt(textEditor.document.lineCount - 1).range.end)];
        const originalLines = [];
        const lineIndexes = [];
        for (const selection of selections) {
            for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; ++lineIndex) {
                const line = textEditor.document.lineAt(lineIndex);
                if (!doNotTranslateRegex.test(line.text)) {
                    originalLines.push(line.text);
                    lineIndexes.push(lineIndex);
                }
            }
        }
        const translatedLines = yield translateLines(language, originalLines);
        while (true) {
            const lineIndex = lineIndexes.shift();
            const translatedLine = translatedLines.shift();
            if (lineIndex === undefined || translatedLine === undefined) {
                break;
            }
            const line = textEditor.document.lineAt(lineIndex);
            workspaceEdit.replace(documentUri, line.range, translatedLine);
        }
        yield vscode.workspace.applyEdit(workspaceEdit);
        return true;
    });
}
function translateText(language, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(language)}&dt=t&q=${encodeURIComponent(text)}`;
        const json = JSON.parse(yield httpGet(url));
        return json[0].map((x) => x[0]).join('');
    });
}
function translateLines(language, originalLines) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const lines = [];
        let length = 0;
        for (const originalLine of originalLines) {
            if (length + originalLine.length + 1 > 5000) {
                const translatedText = yield translateText(language, lines.join('\n'));
                Array.prototype.push.apply(result, translatedText.split('\n'));
                lines.length = 0;
                length = 0;
            }
            lines.push(originalLine);
            length += originalLine.length + 1;
        }
        const translatedText = yield translateText(language, lines.join('\n'));
        Array.prototype.push.apply(result, translatedText.split('\n'));
        return result.map(x => x.replace(/(<)(\/?)\s*([bi])\s*(>)/gi, '$1$2$3$4'));
    });
}
function httpGet(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const uri = new url_1.URL(url);
            const opts = {
                hostname: uri.hostname,
                port: uri.port || 443,
                path: uri.pathname + uri.search,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36'
                }
            };
            https.get(opts, res => {
                if (res.statusCode !== 200) {
                    reject(new Error(``));
                }
                let body = '';
                res.on('data', d => body += d);
                res.on('end', () => resolve(body));
            });
        });
    });
}
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.shift', shift));
    context.subscriptions.push(vscode.commands.registerCommand('extension.renumber', renumber));
    context.subscriptions.push(vscode.commands.registerCommand('extension.reorder', reorder));
    context.subscriptions.push(vscode.commands.registerCommand('extension.linearCorrection', linearCorrection));
    context.subscriptions.push(vscode.commands.registerCommand('extension.translate', translate));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map