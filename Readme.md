# `plugin-vite-check-env`

A Vite plugin for checking and validating environment variables in your Vite project.

## Installation

To install the plugin, use npm or yarn:

```bash
npm install plugin-vite-check-env --save-dev
```

or
```bash
yarn add plugin-vite-check-env --dev
```

## Usage
In your `vite.config.js` or `vite.config.ts`, import and configure the plugin:

```ts
import { defineConfig } from 'vite';
import CheckEnv from 'plugin-vite-check-env';

export default defineConfig({
  plugins: [
    // ...other plugins
    CheckEnv({
      VITE_DOMAIN_API: undefined, // Required variable with no default value
      VITE_TIMEOUT_REDIRECT: 1000, // Optional variable with a default value
      PORT: { type: 'custom', value: 3000 }, // Custom environment variable with default value
      HOST: { type: 'custom', required: true }, // Required custom variable
    }),
  ],
});
```

## Options Format
You can define environment variables in two ways:

* As a simple key-value pair:
  * If a variable is marked as `undefined`, it is considered required but without a default value.
  * If a value is provided, it will be used as the default if the variable is not defined.
* Using an object description: You can define environment variables using a more detailed object structure if needed:
```ts
export interface IOptions {
  [index: string]: {
    type: 'custom' | 'vite', // Where the plugin should look for the variable (process.env or import.meta.env)
    value?: string, // Optional default value if the variable is not set
    required?: boolean, // If true, the variable must be defined
  }
}
```

## Example
### Simple Definition

```ts
CheckEbv({
  VITE_DOMAIN_API: undefined, // This variable is required with no default value
  VITE_TIMEOUT_REDIRECT: 1000, // Optional variable with a default of 1000
});
```

### Object Definition
```ts
CheckEbv({
  PORT: { type: 'custom', value: '3000' }, // Custom variable with a default value
  HOST: { type: 'custom', required: true }, // Custom variable that is required
});
```

## Explanation

* `type`: Specifies where the plugin should retrieve the environment variable from.
  * `vite`: Looks for the variable in `import.meta.env`.
  * `custom`: Looks for the variable in `process.env` (you might load these with tools like `dotenv`).
* `value`: Provides a default value for the variable if it is not set. Note: This cannot be used together with `required`.
* `required`: Ensures that the environment variable is defined. If it's not, the plugin will throw an exception. Note: This cannot be used together with `value`.

## Handling Missing Variables
If a required environment variable is not found, the plugin will throw an error and stop the build process. This ensures that the necessary environment variables are always present when running your Vite project.

## Use Cases

* **Development**: Ensure that critical environment variables like API URLs or authentication tokens are present and configured correctly.
* **Production**: Set up default values for non-critical variables, while ensuring that required variables are always set.

## License
ISC