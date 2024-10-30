module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/stylistic",
		"airbnb-base",
		"plugin:import/typescript",
		"plugin:prettier/recommended",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["prettier"],
	rules: {
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				ts: "never",
			},
		],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				allowExpressions: false,
				allowTypedFunctionExpressions: true,
				allowHigherOrderFunctions: false,
				allowDirectConstAssertionInArrowFunctions: false,
				allowConciseArrowFunctionExpressionsStartingWithVoid: false,
			},
		],
		"no-console": "off",
		"func-names": "off",
		"lines-between-class-members": "off",
		"class-methods-use-this": "off",
	},
};
