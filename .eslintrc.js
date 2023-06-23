module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es2021: true,
	},
	'extends': [
		'eslint:recommended',
		// 'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'prettier',
	],

	overrides: [],
	parserOptions: {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'tsconfigRootDir': '.',
		'project': [
			'./tsconfig.json',
		],
	},
	plugins: [
		'react',
		'prettier',
		'@typescript-eslint',
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/ban-types': [
			'error',
			{
				'extendDefaults': true,
				'types': {
					'{}': false,
				},
			},
		],
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'object-shorthand': 'error',
		'no-console': 'warn',
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
			},
		},
	},

}
