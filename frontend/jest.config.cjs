module.exports = {
    transform: {
      // "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.js$": "babel-jest"
    },
    // testEnvironment: "jsdom",
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", 
    ],
  };