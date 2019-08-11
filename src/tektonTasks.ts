import * as vscode from 'vscode';

export class TektonTaskProvider implements vscode.TreeDataProvider<TektonTask>{

  private _onDidChangeTreeData: vscode.EventEmitter<TektonTask | undefined> = new vscode.EventEmitter<TektonTask | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TektonTask | undefined> = this._onDidChangeTreeData.event;

  getTreeItem(element: TektonTask): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TektonTask | undefined): Thenable<TektonTask[]>  {
    return Promise.resolve(this.getTasks());
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  private getTasks(): TektonTask[] {
    return [];
  }
}

export class TektonTask extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

}