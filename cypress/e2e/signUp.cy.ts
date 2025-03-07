import axiosInstance from '../../src/utils/axiosConfig';

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

  afterEach(() =>{
    axiosInstance.post('/authentication/login', {
      email: 'testuser@youlink.com',
      password: 'SecurePass123!'
    })
    .then((response) => {
      expect(response.status).to.eq(200)

      return axiosInstance.delete('/user/deleteUser')

    })
    .then((response) => {
      expect(response.status).to.eq(200)
    })
    .catch((error) => {
      cy.log(error)
    })
  })
})