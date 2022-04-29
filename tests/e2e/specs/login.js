// https://docs.cypress.io/api/introduction/api.html

describe('Login flow', () => {
  it('Visits the app root url', () => {
    cy.visit('/login')
    cy.contains('Login with Spotify')
    cy.get('#spotify-login-btn').click()
    cy.url().should('include', 'https://accounts.spotify.com/')
    // cy.get('input[id="login-username"]').type('username')
    // cy.get('input[id="login-password"]').type('password')
    // cy.get('#login-button').click()
    // cy.url().should('include', '/complete')
  })
})
