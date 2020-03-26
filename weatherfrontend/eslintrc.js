module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    parser: "babel-eslint",
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 2016,
        sourceType: "module"
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-console": "off",
        "no-unused-vars": "off"
    }
};