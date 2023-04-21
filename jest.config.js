const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    moduleFileExtensions: ['js', 'html', 'css'],
    moduleNameMapper: {
        '^lightning/mobileCapabilities$': '<rootDir>/force-app/main/default/lwc/__mocks__/lightning'
    }
};

