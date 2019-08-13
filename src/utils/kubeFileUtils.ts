import { Uri } from 'vscode';

export const K8S_RESOURCE_SCHEME = "k8smsx";
export const KUBECTL_RESOURCE_AUTHORITY = "loadkubernetescore";

export function kubefsUri(namespace: string | null, value: string, outputFormat: string): Uri {
  const docname = `${value.replace('/', '-')}.${outputFormat}`;
  const nonce = new Date().getTime();
  const nsquery = namespace ? `ns=${namespace}&` : '';
  const uri = `${K8S_RESOURCE_SCHEME}://${KUBECTL_RESOURCE_AUTHORITY}/${docname}?${nsquery}value=${value}&_=${nonce}`;
  return Uri.parse(uri);
}
