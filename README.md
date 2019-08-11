# Tektoncd extension for vscode

[Tektoncd](https://tekton.dev) extension for vscode that allows you create and run Tekton pipelines form within vscode.

> NOTE: Few features are still under development and can change quickly

## Features

* [X] Tekton code snippets, allowing you to quickly create the Tekton CRD yamls quickly
* [X] Ability view the Tekton resources from within vscode via the explorer
* [] Commands to trigger taskrun/pipelinerun from * within vscode
* [ ] View PipelineRun and TaskRun logs via vscode terminal

## Requirements

The plugin uses [Tekton CLI](https://github.com/tektoncd/cli) and [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/). 

## Known Issues

* [ ] Commands to trigger taskrun/pipelinerun from within vscode
* [ ] View PipelineRun and TaskRun logs via vscode terminal

## Release Notes

### 0.0.1

Initial release of Tekton vscode plugin, the features of this version is very primitive

* Tekton resource snippets that gets activated using the keywords `task`,`taskrun`,`pipeline`, `pipeline-resource`,`task-parameter` etc.,
* You can view the Tekton resources in the Kubernetes cluster view
