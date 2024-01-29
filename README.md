## Setup

### Run

```
npm run dev
```

### Dev Dependencies

```
npm install --save-dev nodemon prettier ts-loader typescript webpack webpack-shell-plugin-next
```

### Configurations

scripts

```json
  "scripts": {
    "dev": "webpack --mode none --watch",
    "start:dev": "nodemon ./dist/app.js",
    ...
  },
```

tsconfig.json

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "es2016",

    /* Modules */
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "Node",
    "outDir": "./dist",

    /* Interop Constraints */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    /* Type Checking */
    "strict": true,

    /* Completeness */
    "skipLibCheck": true
  },
  "exclude": ["node_modules"]
}
```

webpack.config.js

```js
// Generated using webpack-cli https://github.com/webpack/webpack-cli
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: path.join('.', 'app.js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';

    // Add sourcemap for development
    config.devtool = 'source-map';

    // Run server
    const serverRunnerPlugin = new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run start:dev'],
        parallel: true,
      },
    });

    config.plugins.push(serverRunnerPlugin);
  }
  return config;
};
```

prettier

```json
{
  "tabWidth": 2,
  "bracketSameLine": true,
  "bracketSpacing": true,
  "trailingComma": "all",
  "singleQuote": true
}
```
