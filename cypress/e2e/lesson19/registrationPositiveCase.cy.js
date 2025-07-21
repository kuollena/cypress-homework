it('should register and login successfully', () => {
  const uniqueEmail = `test+${Date.now()}@test.com`;
  const password = 'Password123';

  cy.wrap(uniqueEmail).as('userEmail');
  cy.wrap(password).as('userPassword');

  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });

  cy.contains('Sign up', { timeout: 10000 }).should('be.visible').click();

  cy.get('#signupName').type('John');
  cy.get('#signupLastName').type('Doe');
  cy.get('#signupEmail').type(uniqueEmail);
  cy.get('#signupPassword').type(password);
  cy.get('#signupRepeatPassword').type(password);
  cy.contains('button', 'Register').should('be.enabled').click();

  // Обов'язково розлогінитись
  cy.contains('Log out').should('be.visible').click();

  // Тепер спробувати увійти знову
  cy.loginWithSavedCredentials();
});