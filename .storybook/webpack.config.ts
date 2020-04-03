import webpack, { Plugin, RuleSetRule } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import generateDevConfig from '../webpack/webpack.config';
import { IEnvironment } from '../webpack/types';

const env: IEnvironment = {
  ENVIRONMENT_FILE_NAME: '.env.development'
};

const devConfig = generateDevConfig(env);

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

  const filteredRules = module.rules.reduce((accumulator, rule) => {
    const ruleJson = JSON.stringify(rule);
    const { test } = rule;

    if (test instanceof RegExp && test.test('test.svg')) {
      rule.exclude = /\.svg$/;
    } else if (test && test.toString().indexOf('svg')) {
      rule.exclude = /\.svg$/;
    }

    if (ruleJson.indexOf('babel-loader') !== -1) {
      return accumulator;
    }

    return [
      ...accumulator,
      rule,
    ];
  }, [] as RuleSetRule[]);

  config.module = {
    ...module,
    rules: (filteredRules || []).concat(devModule.rules as webpack.RuleSetRule[] || []),
  };

  config.resolve = {
    ...resolve,
    extensions: (resolve.extensions || []).concat(['.ts', '.tsx'])
  };

  return config;
};
