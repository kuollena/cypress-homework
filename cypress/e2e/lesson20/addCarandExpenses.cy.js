import { garagePage } from '../pages/garagePage';
import { expensesPage } from '../pages/expensesPage';

describe('Garage and Fuel Expenses', () => {
    beforeEach(() => {
      cy.visit('/', {
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      });

      cy.contains('button', 'Sign In').click();
      cy.get('#signinEmail', { timeout: 10000 }).type(Cypress.env('email'));
      cy.get('#signinPassword', { timeout: 10000 }).type(Cypress.env('password'));
      cy.contains('button', 'Login').click();
    });
  
    it('should add car', () => {
     cy.contains('button', 'Add car').click();
      garagePage.addCar('Audi', 'TT', '1234');
      cy.contains('button', 'Add fuel expense').click();
      expensesPage.add('50', '100');
    });

  });
  
