import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    pageLoadTimeout: 120000,   
defaultCommandTimeout: 10000,  
screenshotOnRunFailure: true,  
  },
});

