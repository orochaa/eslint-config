import { definePlugin } from '../utils/define-plugin.js'
import { extendPluginRules, updateGlobalValues } from '../utils/mappers.js'
import _jestPlugin from 'eslint-plugin-jest'

// https://github.com/jest-community/eslint-plugin-jest?tab=readme-ov-file#readme
export const jestPlugin = definePlugin({
  name: 'jest',
  source: _jestPlugin,
  settings: {
    jest: {
      version: 29,
    },
  },
  globals: updateGlobalValues(
    _jestPlugin.environments.globals.globals,
    'readonly'
  ),
  rules: {},
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules
  testRules: {
    ...extendPluginRules('jest', _jestPlugin.configs.all),

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/consistent-test-it.md
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-expects.md
    'jest/max-expects': ['warn', { max: 10 }],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md
    'jest/max-nested-describe': ['warn', { max: 3 }],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-in-test.md
    'jest/no-conditional-in-test': 'warn',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md
    'jest/no-done-callback': 'warn',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-hooks.md
    'jest/no-hooks': 'off',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-untyped-mock-factory.md
    'jest/no-untyped-mock-factory': 'off',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-each.md
    'jest/prefer-each': 'off',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-assertions.md
    'jest/prefer-expect-assertions': 'off',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
    'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md
    'jest/require-hook': ['error', { allowedFunctionCalls: [] }],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-to-throw-message.md
    'jest/require-to-throw-message': 'warn',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
    'jest/require-top-level-describe': [
      'error',
      { maxNumberOfTopLevelDescribes: 1 },
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
    'jest/unbound-method': 'error',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md
    'jest/valid-expect': [
      'error',
      {
        alwaysAwait: true,
        asyncMatchers: ['toResolve', 'toReject'],
        minArgs: 1,
        maxArgs: 2,
      },
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md
    'jest/valid-title': [
      'error',
      {
        mustMatch: {
          it: '^should',
        },
      },
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-importing-jest-globals.md
    'jest/prefer-importing-jest-globals': 'off',

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-ending-with-an-expect.md
    'jest/prefer-ending-with-an-expect': 'off',
  },
})
