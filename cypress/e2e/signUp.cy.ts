describe('register page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })
  it('Allows users to enter their data', () => {
    cy.getByData('input-userName').type('testuser')
    cy.getByData('input-email').type('testuser@youlink.com')
    cy.getByData('input-password').type('SecurePass123!')
    cy.getByData('input-confirmPassword').type('SecurePass123!')
    cy.getByData('switch-youtuber').click()
    cy.getByData('input-tagChannel').type(Cypress.env('youtuberUser'))
    cy.getByData('switch-linkedin').click()
    cy.getByData('input-professionalURL').type(Cypress.env('professionalUser'))
    cy.getByData('submit-button').click()
  })
})