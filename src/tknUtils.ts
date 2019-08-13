import { TektonObject, PipelineResource, Task, TaskRun, PipelineRun, Pipeline } from "./common/tektonResource";
import { Tkn } from "./tkn";
import { Host } from "./host";

export async function getResources(tkn: Tkn, host: Host): Promise<TektonObject[]> {
  const lines = await tkn.asLines('resource ls');
  const resources: TektonObject[] = [];
  if (lines.succeeded) {
    console.log(`Pipeline Resources :${lines.result}`);
    lines.result.forEach((e) => {
      const res = e.match(/\S+/g) || [];
      if (res.length > 0) {
        resources.push(new PipelineResource(res[0], res[1], `${res[3]}${res[4]}`));
      }
    });
  } else {
    host.showErrorMessage(`Error getting Pipeline Resources ${lines.error}`);
  }
  return resources;
}

export async function getTasks(tkn: Tkn, host: Host): Promise<TektonObject[]> {
  const lines = await tkn.asLines('task ls');
  const resources: TektonObject[] = [];
  if (lines.succeeded) {
    console.log(`Pipeline Tasks :${lines.result}`);
    lines.result.forEach((e) => {
      const res = e.match(/\S+/g) || [];
      if (res.length > 0) {
        resources.push(new Task(res[0]));
      }
    });
  } else {
    host.showErrorMessage(`Error getting Tasks ${lines.error}`);
  }
  return resources;
}

export async function getTaskRuns(tkn: Tkn, host: Host): Promise<TektonObject[]> {
  const lines = await tkn.asLines('taskrun ls');
  const resources: TektonObject[] = [];
  if (lines.succeeded) {
    console.log(`Task Runs :${lines.result}`);
    lines.result.forEach((e) => {
      const res = e.match(/\S+/g) || [];
      if (res.length > 0) {
        resources.push(new TaskRun(res[0]));
      }
    });
  } else {
    host.showErrorMessage(`Error getting Task Runs ${lines.error}`);
  }
  return resources;
}

export async function getPipelines(tkn: Tkn, host: Host): Promise<TektonObject[]> {
  const lines = await tkn.asLines('pipeline ls');
  const resources: TektonObject[] = [];
  if (lines.succeeded) {
    console.log(`Pipelines  :${lines.result}`);
    lines.result.forEach((e) => {
      const res = e.match(/\S+/g) || [];
      if (res.length > 0) {
        resources.push(new Pipeline(res[0]));
      }
    });
  } else {
    host.showErrorMessage(`Error getting Pipelines ${lines.error}`);
  }
  return resources;
}

export async function getPipelineRuns(tkn: Tkn, host: Host): Promise<TektonObject[]> {
  const lines = await tkn.asLines('pipelinerun ls');
  const resources: TektonObject[] = [];
  if (lines.succeeded) {
    console.log(`Pipeline Runs  :${lines.result}`);
    lines.result.forEach((e) => {
      const res = e.match(/\S+/g) || [];
      if (res.length > 0) {
        resources.push(new PipelineRun(res[0]));
      }
    });
  } else {
    host.showErrorMessage(`Error getting Pipeline Runs ${lines.error}`);
  }
  return resources;
}