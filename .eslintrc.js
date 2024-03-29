module.exports = {
    "root": true,
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
    "jsx": true
    }
  },
  "env": {
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true
  },
  "rules": {
    "max-len": [
		2,
		80,
		2
    ],
    "eqeqeq": "off",
    "arrow-body-style": "off",
    "class-methods-use-this": 0,
    "prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/first": "off",
    "import/no-extraneous-dependencies": "off",
    "one-var": 0,
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    "one-var-declaration-per-line": 0,
    "new-cap": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "curly": [
		"error",
		"multi-line"
    ],
    "array-callback-return": 0,
    "import/no-unresolved": [
		2,
		{
		"commonjs": true
		}
    ],
    "no-shadow": [
		"off",
		{
			"allow": [
				"req",
				"res",
				"err"
			]
		}
    ]
  },
  "globals": {
    "localStorage": true,
    "window": true,
    "document": true,
    "toastr": true,
    "FormData": true
    },
	"settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  }
};