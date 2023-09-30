module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
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
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        process: true,
        module: true,
        require: true,
        resolve: true,
        __dirname: true,
        MathJax: true
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        "vue/multi-word-component-names": "off",
        indent: ["error", 4, { SwitchCase: 1 }], // 必须是4个空格缩进
        semi: ["error", "always"], // 句尾必须有分号
        quotes: ["error", "double"], // 字符串必须为双引号
        "no-unused-vars": "warn", // 未使用的变量发出警告
        eqeqeq: ["error", "always", { null: "ignore" }], //比较时强制使用 === 或者 !==,但对null作比较时可以不用全等
        "new-cap": [
            2,
            {
                newIsCap: true,
                capIsNew: false,
            },
        ], // 要求构造函数首字母大写
    },
};
