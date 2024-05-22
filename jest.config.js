module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./src'],
    setupFiles: ["<rootDir>/test/setup.ts"],
    globals: {
        _STD_: {
            env: {},
        }
    }
};