import { garagePage } from '../pages/garagePage';
import { expensesPage } from '../pages/expensesPage';

describe('Garage and Fuel Expenses with API Validation', () => {
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

  it('should create car, validate via API, add expense and verify in UI', () => {
    cy.intercept('POST', '**/api/cars').as('createCar');

    cy.contains('button', 'Add car').click();
    garagePage.addCar('Audi', 'TT', '1234');

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);

      const createdCar = interception.response.body.data;
      const createdCarId = createdCar.id;
      const initialMileage = createdCar.mileage;
      const expenseMileage = initialMileage + 10;

      // validation for GET /cars
      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const foundCar = response.body.data.find(car => car.id === createdCarId);
        expect(foundCar).to.exist;
        expect(foundCar.brand).to.eq(createdCar.brand);
        expect(foundCar.model).to.eq(createdCar.model);
        expect(foundCar.mileage).to.eq(createdCar.mileage);
      });

      // adding expenses via command
      cy.createExpenseViaAPI(createdCarId, 50, 100, expenseMileage).then((createdExpense) => {
        cy.reload();
        cy.contains('Fuel expenses').click();
        cy.get('table[class = "table expenses_table"]').should('be.visible');
      });
    });
  });
});
