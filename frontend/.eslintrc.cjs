module.exports = {
    env: {
        es2020: true,
        browser: true,
    },
    extends: ['eslint:recommended', 'react-app', 'react-app/jest'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Enable JSX parsing
        },
    },
    ignorePatterns: ['dist/**/*'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/jsx-uses-react': 'error', // Enable React-specific linting rules
        'react/jsx-uses-vars': 'error',
    },
};
