const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  e2e: {
    setupNodeEvents(on, _config) {
      return require('./cypress/plugins/console-logger').install(on);
    },
    baseUrl: 'http://localhost:8002',
    specPattern: 'cypress/e2e/**/*.js',
  },
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
});
