import { Plugin } from 'vite';

export interface IOptions {
  [index: string]: {
    type: 'custom' | 'vite',
    value?: string,
    required?: boolean,
  } | string | undefined
}

export default function CheckEnv(options: IOptions): Plugin {
  return {
    name: 'plugin:vite-check-env',
    enforce: 'pre',
    configResolved(config) {
      let stopWork = false

      if (options === undefined) return

      Object.keys(options).forEach((_) => {
        if (typeof options[_] === 'object') {
          const env = options[_];
          const checkedArea = env.type === 'vite' ? config.env : process.env;
          if (checkedArea[_]) return;

          if (env.required) {
            stopWork = true;
            console.error(`The required environment variable [${_}] has not been declared`)
            return
          }

          if (!env.value) {
            stopWork = true;
            console.error(`The default value for the environment variable [${_}] is not defined`)
            return;
          }
          
          checkedArea[_] = env.value
        }

        if (config.env[_]) return;
        if (!config.env[_] && typeof options[_] === 'string') return config.env[_] = options[_];
        if (!config.env[_] && typeof options[_] === 'undefined') {
          console.error(`The environment variable [${_}] is not defined`)
          stopWork = true
          return;
        }

        stopWork = true
        console.error('An invalid value was passed when declaring the standard value of an environment variable: ' + _)
        return;
      })

      if (stopWork) {
        throw new Error('Execution is suspended due to a mismatch in the configuration of the environment variables')
      }
    },
  }
}