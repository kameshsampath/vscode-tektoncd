import { Errorable } from "./errorable";
import { ShellResult, Shell } from "./shell";
import { Host } from "./host";

export function create(host: Host, shell: Shell): Tkn {
  return new TknImpl(host, shell);
}

export interface Tkn {
  invokeAsync(command: string, stdin?: string): Promise<ShellResult>;
  asLines(command: string): Promise<Errorable<string[]>>;
}

interface Context {
  readonly host: Host;
  readonly shell: Shell;
}

class TknImpl implements Tkn {
  private readonly context: Context;
  constructor(readonly host: Host, readonly shell: Shell) {
    this.context = {
      host: host,
      shell: shell,
    };
  }
  invokeAsync(command: string, stdin?: string | undefined): Promise<any> {
    return invokeAsync(this.context, command, stdin);
  }
  asLines(command: string): Promise<Errorable<string[]>> {
    return asLines(this.context, command);
  }
}

// TODO get tkn path
async function invokeAsync(context: Context, command: string, stdin?: string): Promise<ShellResult> {
  const bin = 'tkn';
  const cmd = `${bin} ${command}`;
  console.log(`Command to be executed ${cmd}`);
  const sr = await context.shell.exec(cmd, stdin);
  return sr;
}

async function asLines(context: Context, command: string): Promise<Errorable<string[]>> {
  const shellResult = await invokeAsync(context, command);
  if (shellResult.code === 0) {
    let lines = shellResult.stdout.split('\n');
    lines.shift();
    lines = lines.filter((l) => l.length > 0);
    return { succeeded: true, result: lines };
  }
  return { succeeded: false, error: [shellResult.stderr] };
}

// TODO get tkn path via config and OS