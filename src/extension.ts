import * as vscode from 'vscode';
import * as k8s from 'vscode-kubernetes-tools-api';
import { ClusterExplorerV1 } from 'vscode-kubernetes-tools-api';

import { host } from './host';
import { create as tknCreate } from './tkn';

import * as explorer from './tektonExplorer';
import { shell } from './shell';

let clusterExplorer: k8s.ClusterExplorerV1 | undefined = undefined;
export let contextGlobalState: vscode.ExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
  contextGlobalState = context;

  console.log('Congratulations, your extension "vscode-tektoncd" is now active!');

  // Register the explorers and commands
  if (hasTekton) {
    const tkn = tknCreate(host, shell);
    const tknExplorer = explorer.create(tkn, host);
    vscode.window.registerTreeDataProvider("tektonExplorer", tknExplorer);
    // const disposable = [
    //   vscode.commands.registerCommand('tekton.pipelineresource.get', (context) => Command.get(context)),
    //   vscode.commands.registerCommand('tekton.pipelineresource.refresh', () => tknPipelineResExplorer.refresh())
    // ];
    // disposable.forEach((value) => context.subscriptions.push(value));
  }
}
async function hasTekton(): Promise<boolean> {
  const kubectl = await k8s.extension.kubectl.v1;
  if (kubectl.available) {
    const sr = await kubectl.api.invokeCommand('api-versions');
    if (!sr || sr.code !== 0) {
      return false;
    }
    return sr.stdout.includes("tekton.dev/v1alpha1");
  }
  return false;
}

// this method is called when your extension is deactivated
export function deactivate() { }
