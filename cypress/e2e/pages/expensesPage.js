class ExpensesPage {

  getNumberofLitrsDropdown() {
    return cy.get('#addExpenseLiters');
  }

  getCostInput() {
    return cy.get('#addExpenseTotalCost');

  }

  getAddButtonInModal() {
    return cy.contains('button', /^Add$/);
  }

  addExpenses(liters, cost) {
    this.getNumberofLitrsDropdown().type(liters);
    this.getCostInput().type(cost);
    this.getAddButtonInModal().click();
   
  }
}
  
  export const expensesPage = new ExpensesPage();
  
