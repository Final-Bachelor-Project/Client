describe('Complete profile flow', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'api/users/current',
        },
            {
                id: "id",
                display_name: "username"
            }
        ).as('currentUser')

        cy.intercept({
            method: 'GET',
            url: 'api/auth/session',
        }, {}).as('session1')

        cy.intercept({
            method: 'GET',
            url: 'api/auth/session',
        }, {
            data: {
                id: "id",
                display_name: "username"
            }
        }).as('session2')


        cy.intercept("POST", "api/users", {
            statusCode: 200
        }).as('createUser')
    })
    it('Visits the app root url', () => {
        cy.visit('/complete')
        cy.wait(['@currentUser'])
        cy.get('input[id="first-name"]').type('First name')
        cy.get('input[id="last-name"]').type('Last name')
        cy.get('input[id="date-of-birth-input"]').type('2000-12-20')
        cy.get('input[id="city"]').type('City')
        cy.get('input[id="country"]').type('Country')
        cy.get('textarea[id="bio"]').type('Bio')
        cy.get('#complete-btn').click()
        cy.wait(['@createUser'])
        cy.wait(['@session2'])
        cy.contains('Your suggestions')
    })
})