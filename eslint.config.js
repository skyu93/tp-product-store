import prettier from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		plugins: {
			'@typescript-eslint': typescript,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin
		},
		rules: {}
	},
	prettier
];
