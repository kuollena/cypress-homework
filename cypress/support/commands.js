/// <reference types="cypress" />

// Sign in with saving credentials
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

//command to hide the sensitive data in the log
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

//command for adding expenses

Cypress.Commands.add('createExpenseViaAPI', (carId, liters, cost, mileage = 100) => {
  const today = new Date().toISOString().split('T')[0]; 

  return cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/expenses',
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    body: {
      carId,
      reportedAt: today,
      mileage: mileage,
      liters: liters,
      totalCost: cost,
      forceMileage: false
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq('ok');
    return response.body.data;
  });
});



