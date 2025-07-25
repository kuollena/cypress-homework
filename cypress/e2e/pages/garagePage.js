class GaragePage {
  getBrandDropdown() {
    return cy.get('#addCarBrand');
  }

  getModelDropdown() {
    return cy.get('#addCarModel');
  }

  getMileageInput() {
    return cy.get('#addCarMileage');
  }

  getAddButtonInModal() {
    return cy.contains('button', /^Add$/);
  }

  addCar(brand, model, mileage) {
    this.getBrandDropdown().select(brand); 
    this.getModelDropdown().select(model); 
    this.getMileageInput().type(mileage); 
    this.getAddButtonInModal().click();    
  }
}

export const garagePage = new GaragePage();
