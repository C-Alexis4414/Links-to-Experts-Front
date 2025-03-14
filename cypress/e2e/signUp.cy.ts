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

    cy.url().should('include', '/')
  })

  afterEach(() =>{
    cy.wait(500)

    cy.request({
      method: 'POST',
      url: `${Cypress.env('urlBackend')}/authentication/login`,
      body: {
        email: 'testuser@youlink.com',
        password: 'SecurePass123!'
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)

      const token = loginResponse.body.accessToken
      cy.wrap(token).as('authToken')

      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('urlBackend')}/user/deleteUser`,
        // body: { username: 'testuser' },
        headers: { 
          // 'X-Test-Mode': 'true',
          'Authorization': `Bearer ${token}`
        }
      })
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)
      })
    })
  })
})