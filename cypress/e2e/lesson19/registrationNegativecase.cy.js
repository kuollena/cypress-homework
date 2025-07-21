describe('Registration Fields Validation', () => {

  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });

    cy.wait(2000);

    cy.get('button.hero-descriptor_btn.btn.btn-primary')
      .should('be.visible')
      .click();

    cy.wait(500);
  });

  context('Name Field', () => {

    it('should show red border and validation message when empty', () => {
      cy.get('#signupName').focus().blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Name required').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show validation error if non-English characters provided', () => {
      cy.get('#signupName').type('Олена').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Name is invalid').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if less than 2 characters', () => {
      cy.get('#signupName').type('A').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if input less than 2 characters after trimming', () => {
      cy.get('#signupName').type(' A ').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Name is invalid').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if more than 20 characters', () => {
      cy.get('#signupName').type('Alexanderlongtestname').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

  });

  context('Last Name Field', () => {

    it('should show red border and validation message when empty', () => {
      cy.get('#signupLastName').focus().blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Last name required').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show validation error if non-English characters provided', () => {
      cy.get('#signupLastName').type('Терещенко').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Last name is invalid').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if less than 2 characters', () => {
      cy.get('#signupLastName').type('A').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if input less than 2 characters after trimming', () => {
      cy.get('#signupLastName').type(' A ').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Last name is invalid').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

    it('should show error if more than 20 characters', () => {
      cy.get('#signupLastName').type('Alexanderlongtestname').blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

  });

  context('Email Field', () => {

    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@com',
      'username@yahoo..com'
    ];

    invalidEmails.forEach((email) => {
      it(`should show validation error for invalid email: ${email}`, () => {
        cy.get('#signupEmail').type(email).blur()
          .should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Email is incorrect').should('be.visible');
        cy.contains('button', 'Register').should('be.disabled');
        cy.get('#signupEmail').clear();
      });
    });

    it('should show red border and validation message when empty', () => {
      cy.get('#signupEmail').focus().blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Email required').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

  });

  context('Password Field', () => {

    const invalidPasswords = [
      { value: 'short1A', reason: 'less than 8 characters' },
      { value: 'thisisaverylongpassword1A', reason: 'more than 15 characters' },
      { value: 'alllowercase1', reason: 'no capital letter' },
      { value: 'ALLUPPERCASE1', reason: 'no small letter' },
      { value: 'NoDigitsHere', reason: 'no number' },
    ];

    invalidPasswords.forEach((testCase) => {
      it(`should show validation error when password is ${testCase.reason}`, () => {
        cy.get('#signupPassword')
          .clear()
          .type(testCase.value)
          .blur()
          .should('have.css', 'border-color', 'rgb(220, 53, 69)');

        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
          .should('be.visible');

        cy.contains('button', 'Register').should('be.disabled');
      });
    });

    it('should show red border and validation message when empty', () => {
      cy.get('#signupPassword')
        .focus()
        .blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');

      cy.contains('Password required').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

  });

  context('Repeat Password Field', () => {

    it('should show error when repeat password does not match password', () => {
      cy.get('#signupPassword').type('Test1234');
      cy.get('#signupRepeatPassword').type('Different123')
        .blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('should show red border and validation message when empty', () => {
      cy.get('#signupRepeatPassword').focus().blur()
        .should('have.css', 'border-color', 'rgb(220, 53, 69)');
      cy.contains('Re-enter password required').should('be.visible');
      cy.contains('button', 'Register').should('be.disabled');
    });

  });

});
