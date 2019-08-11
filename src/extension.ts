import * as vscode from 'vscode';
import { TektonTaskProvider } from './tektonTasks';

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-tektoncd" is now active!');

  //Register Tekton Tasks Explorer
  const tknTaskExplorer = new TektonTaskProvider();
  vscode.window.registerTreeDataProvider("tektonTasksExplorer",tknTaskExplorer);
  vscode.commands.registerCommand('tektonTasksExplorer.refreshEntry', () => tknTaskExplorer.refresh());
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
