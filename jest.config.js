const {defaults} = require('jest-config');
module.exports = {
    verbose: true,
    preset: "jest-expo",
    moduleFileExtensions: ['js','jsx','json', 'ts', 'tsx'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testMatch: [
        "**/*.test.ts?(x)"
    ],
    cacheDirectory: ".jest/cache",
};
