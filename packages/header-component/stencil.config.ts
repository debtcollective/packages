import { Config } from '@stencil/core';
import dotEnvPlugin from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'web-header',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    dotEnvPlugin()
  ]
};
