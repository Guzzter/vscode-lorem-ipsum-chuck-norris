// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {getLoremChucksum} from 'lorem-chucksum/lib/index.js';

async function insertText(loremWanted: { count: number, units: string }) {
	let editor = vscode.window.activeTextEditor;
	if (editor !== undefined) {
		editor.edit(edit => editor?.selections.forEach(
			selection => {
				edit.delete(selection);
				edit.insert(selection.start, getLoremChucksum(loremWanted));
			}
		));
	}
}

async function generateLine() {
	insertText({
		count: 1,
		units: 'sentences'
	});

	showThanksMessage();
}

async function generateParagraph() {
	insertText({
	  count: 1,
	  units: 'paragraphs'
	});

	showThanksMessage();
}

async function generateMultipleParagraphs() {
	const paragraphOptions = [];
	for (let i = 2; i <= 10; i++) {
		paragraphOptions.push(i.toString() + ' paragraphs');
	}

	const count = await vscode.window.showQuickPick(paragraphOptions, { placeHolder: 'How many paragraphs?' });
	if (!count) {
	  return;
	}

	insertText({
	  count: Number.parseInt(count),
	  units: 'paragraphs'
	});

	showThanksMessage();
}

function showThanksMessage() {
	vscode.window.setStatusBarMessage('Chuck Norris has you covered!');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	let commands = [
		vscode.commands.registerCommand('vscode-lorem-ipsum-chuck-norris.line', generateLine),
		vscode.commands.registerCommand('vscode-lorem-ipsum-chuck-norris.paragraph', generateParagraph),
		vscode.commands.registerCommand('vscode-lorem-ipsum-chuck-norris.multipleParagraphs', generateMultipleParagraphs)
	];

	commands.forEach(function(command) {
		context.subscriptions.push(command);
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}