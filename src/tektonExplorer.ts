import * as vscode from "vscode";
import * as k8s from 'vscode-kubernetes-tools-api';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { TektonObject, allKinds as tektonKinds, ResourceKind, allKinds } from "./common/tektonResource";
import { Tkn } from "./tkn";
import { Host } from "./host";
import * as tknUtils from './tknUtils'

export function create(tkn: Tkn, host: Host): TektonExplorer {
  return new TektonExplorer(tkn, host);
}

export class TektonExplorer implements vscode.TreeDataProvider<TektonObject> {
  private onDidChangeTreeDataEmitter: vscode.EventEmitter<TektonObject | undefined> = new vscode.EventEmitter<TektonObject | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TektonObject | undefined> = this.onDidChangeTreeDataEmitter.event;

  constructor(private readonly tkn: Tkn, private readonly host: Host) { }

  refresh(): void {
    this.onDidChangeTreeDataEmitter.fire();
  }

  getTreeItem(element: TektonObject): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element.getTreeItem();
  }

  getChildren(parent?: TektonObject): vscode.ProviderResult<TektonObject[]> {
    if (parent) {
      return parent.getChildren(this.tkn, this.host);
    }
    return this.tektonResources();
  }

  tektonResources(): vscode.ProviderResult<TektonObject[]> {
    return [new TektonResourcesNode("Resources"),
    new TektonTaskResourcesNode("Tasks"),
    new TektonPipelineResourcesNode("Pipelines")];
  }
}

abstract class TektonFolder implements TektonObject {
  constructor(readonly label: string, readonly displayName: string, readonly contextValue?: string) { }
  abstract getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]>;

  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.displayName,
      vscode.TreeItemCollapsibleState.Collapsed);
    treeItem.contextValue = this.contextValue || `vsTekton.${this.label}`;
    return treeItem;
  }
}

class TektonResourcesNode implements TektonObject {

  constructor(readonly label: string, readonly metadata?: any) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return [
      new TektonPipelineResourcesFolder(allKinds.resource)
    ];
  }
  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label, vscode.TreeItemCollapsibleState.Collapsed);
    treeItem.contextValue = 'vsTekton.pipeline.resources';
    return treeItem;
  }

  get icon(): vscode.Uri {
    return vscode.Uri.file('');
  }
}

class TektonTaskResourcesNode implements TektonObject {

  constructor(readonly label: string, readonly metadata?: any) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return [
      new TektonPipelineResourcesFolder(allKinds.task),
      new TektonPipelineResourcesFolder(allKinds.taskRun)
    ];
  }
  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label, vscode.TreeItemCollapsibleState.Collapsed);
    treeItem.contextValue = 'vsTekton.resources.tasks';
    return treeItem;
  }

  get icon(): vscode.Uri {
    return vscode.Uri.file('');
  }
}
class TektonPipelineResourcesNode implements TektonObject {

  constructor(readonly label: string, readonly metadata?: any) { }

  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    return [
      new TektonPipelineResourcesFolder(allKinds.pipeline),
      new TektonPipelineResourcesFolder(allKinds.pipelineRun)
    ];
  }
  getTreeItem(): vscode.TreeItem | Thenable<vscode.TreeItem> {
    const treeItem = new vscode.TreeItem(this.label, vscode.TreeItemCollapsibleState.Collapsed);
    treeItem.contextValue = 'vsTekton.resources.pipeline';
    return treeItem;
  }

  get icon(): vscode.Uri {
    return vscode.Uri.file('');
  }
}

class TektonPipelineResourcesFolder extends TektonFolder {
  constructor(readonly kind: ResourceKind) {
    super(kind.label, kind.displayName);
  }
  getChildren(tkn: Tkn, host: Host): vscode.ProviderResult<TektonObject[]> {
    if ("resource" === this.kind.abbreviation) {
      return Promise.resolve(tknUtils.getResources(tkn, host));
    }
    if ("task" === this.kind.abbreviation) {
      return Promise.resolve(tknUtils.getTasks(tkn, host));
    }
    if ("taskrun" === this.kind.abbreviation) {
      return Promise.resolve(tknUtils.getTaskRuns(tkn, host));
    }
    if ("pipeline" === this.kind.abbreviation) {
      return Promise.resolve(tknUtils.getPipelines(tkn, host));
    }
    if ("pipeline" === this.kind.abbreviation) {
      return Promise.resolve(tknUtils.getPipelineRuns(tkn, host));
    }
    return Promise.resolve([]);
  }
}
