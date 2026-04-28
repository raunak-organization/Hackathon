export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'], // scope is required
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
  },
};
