module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"prettier/prettier": [
			"error",
			{
				semi: true,
				singleQuote: false,
				printWidth: 120,
				bracketSpacing: false,
				trailingComma: "es5",
				useTabs: true,
				tabWidth: 4,
			},
		],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
	ignorePatterns: ["node_modules", "package.json"],
};
