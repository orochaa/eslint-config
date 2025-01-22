import type { EslintConfig, EslintPlugin } from '../types.js'
import { GLOB_EXCLUDE } from './globs.js'
import { reduceByKey } from './mappers.js'
import type { ESLint, Linter } from 'eslint'
import _tsEslint from 'typescript-eslint'

export interface DefinePartialEslintConfig<
  TPluginName extends string = string,
> {
  files: string[]
  parserOptions?: Partial<EslintConfig['languageOptions']['parserOptions']>
  settings?: EslintConfig['settings']
  globals?: EslintConfig['languageOptions']['globals']
  plugins: EslintPlugin<TPluginName>[]
  extendPlugins: 'rules' | 'testRules'
  rules: EslintConfig['rules']
}

export function defineConfig<TPluginName extends string>(
  config: DefinePartialEslintConfig<TPluginName>
): EslintConfig<TPluginName> {
  return {
    files: config.files,
    ignores: GLOB_EXCLUDE,
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parser: _tsEslint.parser as Linter.Parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        ...config.parserOptions,
      },
      globals: {
        ...reduceByKey(config.plugins, 'globals'),
        ...config.globals,
      },
    },
    settings: {
      ...reduceByKey(config.plugins, 'settings'),
      ...config.settings,
    },
    plugins: mapPlugins(config.plugins),
    rules: {
      ...reduceByKey(config.plugins, config.extendPlugins),
      ...config.rules,
    },
  }
}

function mapPlugins<TPluginName extends string>(
  plugins: EslintPlugin<TPluginName>[]
): Record<TPluginName, ESLint.Plugin> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result = {} as Record<TPluginName, ESLint.Plugin>

  for (const { name, source } of plugins) {
    if (!name) {
      continue
    }
    result[name] = source
  }

  return result
}
