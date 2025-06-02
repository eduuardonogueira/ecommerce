const { CracoAliasPlugin } = require("react-app-alias");
const DotEnv = require("dotenv");
const webpack = require("webpack");

const enviroment = process.env.DEPLOY_ENV;

if (enviroment !== "production") {
  const envPath = DotEnv.config({ path: `.env.${enviroment}` });
  if (envPath.error) {
    throw envPath.error;
  }

  const env = DotEnv.config({ path: `.env.${enviroment}` }).parsed;
  const envLocal = DotEnv.config({ path: ".env.local" }).parsed || {};

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next.trim()}`] = envLocal[next]
      ? JSON.stringify(envLocal[next].trim())
      : JSON.stringify(env[next].trim());

    return prev;
  }, {});

  console.log(`
  key: ${enviroment.toLocaleUpperCase()},
  value: ${process.env.REACT_APP_DEPLOY_ENV},
  accumulator: ${envKeys}
`);

  module.exports = {
    webpack: {
      plugins: [new webpack.DefinePlugin(envKeys)],
    },
  };
}

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
  typescript: {
    enableTypeChecking: true,
  },
};
