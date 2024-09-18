import { type Plugin } from "vite";

export interface CheckEnv {
  [index: string]: {
    type: 'custom' | 'vite',
    value?: string,
    required?: boolean,
  } | string | undefined
}

export default function CheckEnv(config: CheckEnv): Plugin;