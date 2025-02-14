describe('register page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })
  it('Allows users to enter their username', () => {
    cy.getByData('input-userName').type('testuser')
  })
  it('Allows users to enter their email', () => {
    cy.getByData('input-email').type('testuser@youlink.com')
  })
  it('Allows users to enter their email', () => {
    cy.getByData('input-password').type('SecurePass123!')
  })
  it('Allows users to enter their email', () => {
    cy.getByData('input-confirmPassword').type('SecurePass123!')
  })
})