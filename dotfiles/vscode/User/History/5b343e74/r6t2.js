module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'subject-case': [0] },
  ignores: [
    (message) => message.includes('[skip ci]') || message.startsWith('wip:'),
  ],
};
