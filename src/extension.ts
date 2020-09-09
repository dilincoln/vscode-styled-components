import * as vscode from 'vscode'

import cssProperties from './cssProperties'

export function activate(context: vscode.ExtensionContext) {
	console.log('Colon and semicolon fix is active!')

	let enterKeyEvent = vscode.commands.registerCommand(
		'extension.insertColonOrSemiColon',
		async () => {
			await vscode.commands.executeCommand('acceptSelectedSuggestion')

			let editor = vscode.window.activeTextEditor

			let cursorPosition = editor.selection

			let lineText = editor.document.lineAt(cursorPosition.start.line).text

			let lineTextList = lineText.trim().split(' ')

			let lastWordBeforeCursor = lineTextList[lineTextList.length - 1]

			if (cssProperties.includes(lastWordBeforeCursor)) {
				editor.edit((editBuilder) => {
					editBuilder.insert(editor.document.lineAt(cursorPosition.active).range.end, ': ;')
					vscode.commands.executeCommand('cursorLeft')
					vscode.commands.executeCommand('editor.action.triggerSuggest')
				})
			}
		}
	)

	context.subscriptions.push(enterKeyEvent)
}
