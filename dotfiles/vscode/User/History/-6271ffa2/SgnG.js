module.exports = {
  presets: [
    'next/babel',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource: '@emotion/react',
        throwIfNamespace: false,
      },
    ],
  ],
  plugins: [
    [
      'styled-components',
      { ssr: true, displayName: true, preprocess: false },
      '@emotion/babel-plugin',
    ],
    [
      'istanbul',
      {
        exclude: ['**/*.spec.{ts,js}'],
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
};
