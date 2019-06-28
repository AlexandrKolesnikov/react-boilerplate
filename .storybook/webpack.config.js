const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CLI_ENVIRONMENT_VARIABLES } = require('../webpack/constants');
const generateDevConfig = require('../webpack/webpack.config');

const env = {
  [CLI_ENVIRONMENT_VARIABLES.ENVIRONMENT_FILE_NAME]: '.env.development'
};

const devConfig = generateDevConfig(env);

const pluginsToBeIgnored = [
  CopyWebpackPlugin,
  HtmlWebpackPlugin
];

const isPluginIgnored = (plugin) => (
  pluginsToBeIgnored.some(pluginClass => plugin instanceof pluginClass)
);

const plugins = devConfig.plugins.filter(plugin => !isPluginIgnored(plugin));

module.exports = ({ config }) => {
  config.plugins = [].concat(config.plugins, plugins);
  config.module.rules = [].concat(config.module.rules, devConfig.module.rules);

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
