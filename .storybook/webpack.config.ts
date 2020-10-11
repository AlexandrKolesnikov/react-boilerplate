import webpack, { Plugin, RuleSetRule } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import generateDevConfig from '../webpack/webpack.config';

const devConfig = generateDevConfig();

const pluginsToBeIgnored = [
  CopyWebpackPlugin,
  HtmlWebpackPlugin
];

const isPluginIgnored = (plugin: Plugin) => (
  pluginsToBeIgnored.some(pluginClass => plugin instanceof pluginClass)
);

const devConfigPlugins = (devConfig.plugins || []).filter(plugin => !isPluginIgnored(plugin));

export default ({ config }: { config: webpack.Configuration }) => {
  const { module = {} as webpack.Module, resolve = {} as webpack.Resolve } = config;
  const { module: devModule = {} as webpack.Module } = devConfig;

  config.plugins = (config.plugins || []).concat(devConfigPlugins);

  const modifiedRules = module.rules.reduce((accumulator, rule) => {
    const extensionsToBeIgnored = ['svg', 'css'];

    extensionsToBeIgnored.forEach(extension => {
      const regExp = new RegExp(`\\.${extension}$`);

      rule.exclude = Array.isArray(rule.exclude)
        ? [...rule.exclude, regExp]
        : [rule.exclude || regExp, regExp];
    });

    if (JSON.stringify(rule).indexOf('babel-loader') !== -1) {
      return accumulator;
    }

    return [
      ...accumulator,
      rule,
    ];
  }, [] as RuleSetRule[]);

  config.module = {
    ...module,
    rules: (modifiedRules || []).concat(devModule.rules as webpack.RuleSetRule[] || []),
  };

  config.resolve = {
    ...resolve,
    extensions: (resolve.extensions || []).concat(['.ts', '.tsx'])
  };

  return config;
};
