module.exports = {
    verbose: true,
    transform: {
        '\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    testPathIgnorePatterns: ['/cypress/'],
    setupFilesAfterEnv: ['<rootDir>/src/setUpTests.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/dev/jestSupport/jest.fileMock.js',
        '\\.(css|less)$': '<rootDir>/dev/jestSupport/jest.styleMock.js',
    },
};
