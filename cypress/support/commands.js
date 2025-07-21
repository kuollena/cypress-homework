Cypress.Commands.add('loginWithSavedCredentials', () => {
  cy.get('@userEmail').then((email) => {
    cy.get('@userPassword').then((password) => {
      cy.visit('https://qauto.forstudy.space/', {
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      });

      cy.contains('Sign In', { timeout: 10000 })
        .should('be.visible')
        .click();

      cy.get('#signinEmail', { timeout: 10000 })
        .should('be.visible')
        .type(email);

      cy.get('#signinPassword', { timeout: 10000 })
        .should('be.visible')
        .type(password, { sensitive: true }); 

      cy.contains('button', 'Login', { timeout: 10000 })
        .should('be.enabled')
        .click();
    });
  });
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false; 

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length), 
    });
  }

  return originalFn(element, text, options);
});
