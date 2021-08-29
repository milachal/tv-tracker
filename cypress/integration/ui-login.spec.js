describe('Login with Google', () => {
  before(() => {
    cy
      .visit('http://localhost:3000/' || 'https://tv-tracker-lo4wami4b-milachal.vercel.app/')
      .get('[data-cy=login-button]').click()
      .get('button').click()
  })

  it('Type credentials', () => {
    const username = Cypress.env('GOOGLE_USER')
    const password = Cypress.env('GOOGLE_PW')

    cy.get('input').type(username).submit()
  })
})