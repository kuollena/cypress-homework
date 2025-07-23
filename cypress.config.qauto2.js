const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    email: 'user2@qauto.test',
    password: 'Welcome2qauto',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports2',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://qauto2.forstudy.space',
  }
});

