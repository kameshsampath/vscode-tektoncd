import * as vscode from 'vscode';
import { Tkn } from '../tkn';
import { Host } from '../host';
import * as path from 'path';

export interface TektonObject {
  readonly label: string;
  readonly metadata?: any;
  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]>;
  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem>;
}

export class ResourceKind implements vscode.QuickPickItem {
  constructor(readonly displayName: string, readonly pluralDisplayName: string, readonly manifestKind: string, readonly abbreviation: string) {
  }
  get label() { return this.displayName; }
  get description() { return ''; }
}

export const allKinds = {
  resource: new ResourceKind("Pipeline Resource", "Pipeline Resources", "pipelineresources.tekton.dev", "resource"),
  task: new ResourceKind("Task", "Tasks", "tasks.tekton.dev", "task"),
  taskRun: new ResourceKind("Task Run", "Task Runs", "taskruns.tekton.dev", "taskrun"),
  pipeline: new ResourceKind("Pipeline", "Pipelines", "pipelines.tekton.dev", "pipeline"),
  pipelineRun: new ResourceKind("Pipeline Run", "Pipeline Runs", "pipelineruns.tekton.dev", "pipelinerun")
};

export class PipelineResource implements TektonObject {

  constructor(readonly label: string, readonly type?: string, readonly description?: string) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return Promise.resolve([]);
  }

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label);
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
    treeItem.tooltip = `Type: ${this.type}`;
    treeItem.contextValue = 'vsTekton.resource';
    treeItem.iconPath = {
      dark: path.join(__filename, '..', '..', '..', 'images/dark/pipelineresource.png'),
      light: path.join(__filename, '..', '..', '..', 'images/light/pipelineresource.png'),
    };
    return treeItem;
  }
}

export class Task implements TektonObject {

  constructor(readonly label: string, readonly type?: string, readonly description?: string) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return Promise.resolve([]);
  }

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label);
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
    treeItem.contextValue = 'vsTekton.task';
    treeItem.iconPath = {
      dark: path.join(__filename, '..', '..', '..', 'images/dark/tektontask.png'),
      light: path.join(__filename, '..', '..', '..', 'images/light/tektontask.png'),
    };
    return treeItem;
  }
}

export class TaskRun implements TektonObject {

  constructor(readonly label: string, readonly type?: string, readonly description?: string) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return Promise.resolve([]);
  }

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label);
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
    treeItem.contextValue = 'vsTekton.taskrun';
    treeItem.iconPath = {
      dark: path.join(__filename, '..', '..', '..', 'images/dark/taskrun.png'),
      light: path.join(__filename, '..', '..', '..', 'images/light/taskrun.png'),
    };
    return treeItem;
  }
}

export class Pipeline implements TektonObject {

  constructor(readonly label: string, readonly type?: string, readonly description?: string) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return Promise.resolve([]);
  }

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label);
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
    treeItem.contextValue = 'vsTekton.pipeline';
    treeItem.iconPath = {
      dark: path.join(__filename, '..', '..', '..', 'images/dark/pipeline.png'),
      light: path.join(__filename, '..', '..', '..', 'images/light/pipeline.png'),
    };
    return treeItem;
  }
}

export class PipelineRun implements TektonObject {

  constructor(readonly label: string, readonly type?: string, readonly description?: string) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return Promise.resolve([]);
  }

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label);
    treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
    treeItem.contextValue = 'vsTekton.pipelinerun';
    treeItem.iconPath = {
      dark: path.join(__filename, '..', '..', '..', 'images/dark/pipelinerun.png'),
      light: path.join(__filename, '..', '..', '..', 'images/light/pipelinerun.png'),
    };
    return treeItem;
  }
}