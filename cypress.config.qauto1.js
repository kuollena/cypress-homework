const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    email: 'user1@qauto.test',
    password: 'Welcome2qauto',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://qauto.forstudy.space',
  }
});
