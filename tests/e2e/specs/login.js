describe('Login flow', () => {

  // beforeEach(() => {
  //   cy.intercept({
  //     method: 'POST',
  //     url: 'https://accounts.spotify.com/api/token',
  //   }, {
  //     data: {
  //     access_token: "token"
  //   }}).as('login')
  // })
  it('Visits the app root url', () => {
    cy.visit('/login')
    cy.contains('Login with Spotify')
    cy.get('#spotify-login-btn').click()
    cy.url().should('include', 'https://accounts.spotify.com/')
    cy.get('input[id="login-username"]').type('username')
    cy.get('input[id="login-password"]').type('password')
    cy.get('#login-button').click()
    //cy.url().should('include', '/complete')
  })
})
