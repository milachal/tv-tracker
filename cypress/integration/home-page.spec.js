describe('Home page testing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('search for tv show', () => {
    cy.get('[data-cy=searchBar]')
      .type('the flash')
      .should('have.value', 'the flash')
  })

  it('click result link', () => {
    cy.get('[data-cy=tv-show-link-60735]').click()
  })
})