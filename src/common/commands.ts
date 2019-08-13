import * as vscode from 'vscode';
import { host } from '../host';
import { kubefsUri } from "../utils/kubeFileUtils";

export class Command {
  static get(ctx: any) {
    // TODO ADD to config contribution
    const outputFormat = "yaml";
    const uri = kubefsUri(ctx.namespace, `pipelineresource ${ctx.label}`, outputFormat);
    host.showDocument(uri)
      .then((doc) => { },
        (err: any) => host.showErrorMessage(`Error loading document: ${err}`));
  }
}