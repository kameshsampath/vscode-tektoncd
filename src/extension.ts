import * as vscode from 'vscode';
import { TektonTaskProvider } from './tektonTasks';
import * as k8s from 'vscode-kubernetes-tools-api';
import { ClusterExplorerV1 } from 'vscode-kubernetes-tools-api';


let clusterExplorer: k8s.ClusterExplorerV1 | undefined = undefined;
export let contextGlobalState: vscode.ExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
  contextGlobalState = context;

  const clusterExplorerAPI = await k8s.extension.clusterExplorer.v1;

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-tektoncd" is now active!');

  if (clusterExplorerAPI.available) {
    clusterExplorer = clusterExplorerAPI.api;
    const nodeContributors = [
      clusterExplorer.nodeSources.resourceFolder("Tasks", "Tasks", "Task", "task").if(hasTekton).at(undefined),
      clusterExplorer.nodeSources.resourceFolder("TaskRun", "TaskRun", "TaskRun", "taskrun").if(hasTekton).at(undefined),
      clusterExplorer.nodeSources.resourceFolder("Pipeline", "Pipeline", "Pipeline", "pipeline").if(hasTekton).at(undefined),
      clusterExplorer.nodeSources.resourceFolder("PipelineRun", "PipelineRun", "PipelineRun", "pipelinerun").if(hasTekton).at(undefined),
      clusterExplorer.nodeSources.resourceFolder("PipelineResource", "PipelineResources", "pipelineresource", "pipelineresource").if(hasTekton).at(undefined)
    ];
    nodeContributors.forEach(element => {
      if (clusterExplorer) {
        clusterExplorer.registerNodeContributor(element);
      }
    });
    clusterExplorer.registerNodeUICustomizer({ customize });
  }
}

function customize(node: ClusterExplorerV1.ClusterExplorerResourceNode, treeItem: vscode.TreeItem): void | Thenable<void> {
  return customizeAsync(node, treeItem);
}

let lastNamespace = '';

async function initNamespaceName(node: ClusterExplorerV1.ClusterExplorerResourceNode) {
  const kubectl = await k8s.extension.kubectl.v1;
  if (kubectl.available) {
    const result = await kubectl.api.invokeCommand('config view -o json');
    if (result) {
      const config = JSON.parse(result.stdout);
      const currentContext = (config.contexts || []).find((ctx: { name: string; }) => ctx.name === node.name);
      if (!currentContext) {
        return "";
      }
      return currentContext.context.namespace;
    } return "default";
  }
}

async function customizeAsync(node: ClusterExplorerV1.ClusterExplorerResourceNode, treeItem: vscode.TreeItem): Promise<void> {
  if ((node as any).nodeType === 'context') {
    lastNamespace = await initNamespaceName(node);
  }
  if (node.nodeType === 'resource' && node.resourceKind.manifestKind === 'Project') {
    // assuming now that it’s a project node
    const projectName = node.name;
    if (projectName === lastNamespace) {
      treeItem.label = `* ${treeItem.label}`;
    } else {
      treeItem.contextValue = `${treeItem.contextValue || ''}.openshift.inactiveProject`;
    }
  }
  if (node.nodeType === 'resource' && node.resourceKind.manifestKind === 'BuildConfig') {
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
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
