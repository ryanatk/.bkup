const path = require('path');

module.exports = {
  stories: ['../components/sormus/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => console.log({ rule }),
      // rule.test('.svg'),
    );

    fileLoaderRule.exclude = /\.svg$/;

    config.node = { fs: 'empty', net: 'empty', tls: 'empty' };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    return config;
  },
};
