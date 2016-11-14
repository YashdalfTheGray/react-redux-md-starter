module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            { 'SwitchCase': 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "no-console": [
            "off"
        ],
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "ignore"
            }
        ],
        "react/jsx-uses-vars": "error"
    }
};
