describe('Add watched tv show', () => {
  it('Select season', () => {
    cy.visit('/tv-shows/60735')
      .get('[data-cy=season-link-Season7]')
      .click()
  })
  
  it('Select watched episode', () => {
    
    cy.get('[data-cy=season-link-7]').click()

    cy.get('[data-cy=check-watched-episode-2482623]').check()

    cy.get('[data-cy=check-watched-episode-2542212]').check()
  })

  // it('Uncheck watched episode', () => {
  //   cy.get('[data-cy=check-watched-episode-2482623]').uncheck()
  //   cy.get('[data-cy=check-watched-episode-2542212]').uncheck()
  // })

  it('Check if watched episodes were added', () => {
    cy.visit('/tv-shows/myShows')
    
  })
})