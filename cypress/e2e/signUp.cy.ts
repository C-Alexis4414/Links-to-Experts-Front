describe('register page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })
  it('Allows users to enter their username', () => {
    cy.get('[name="user.userName"]').type('testuser')
  })
})