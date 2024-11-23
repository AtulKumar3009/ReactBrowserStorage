import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Use jsdom to mock the browser environment
    testMatch: ['**.test.ts'], // Match test files
    clearMocks: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;
