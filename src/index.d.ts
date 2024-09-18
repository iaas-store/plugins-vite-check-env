import { type Plugin } from "vite";
export interface CheckEnvOptions {
  injections: CheckEnv[];
}
export interface CheckEnv {
  [index: string]: {
    type: 'custom' | 'vite',
    value?: string,
    required?: boolean,
  } | string | undefined
}
declare function CheckEnv(config: CheckEnvOptions): Plugin;

export { CheckEnv };