describe('See connection profile flow', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'api/users/current',
        },
            {
                user: {
                    id: "current-id",
                    display_name: "current-username"
                }
            }
        ).as('currentUser');

        cy.intercept({
            method: 'GET',
            url: '/api/users/spotify/current-id',
        },
            {
                user: {
                    _id: "current-db-id",
                    username: "current-username"
                }
            }
        ).as('currentUser-db');
        
        const userToSee = {
            _id: "id",
            username: "username"
        }

        cy.intercept({
            method: 'GET',
            url: 'api/users',
        },
            [
                userToSee
            ]
        ).as('users')

        cy.intercept({
            method: 'GET',
            url: '/api/users/id',
        }, userToSee).as('user');

    })
    it('Visits the app root url', () => {
        cy.visit('/')
        cy.wait(['@currentUser'])
        cy.wait(['@currentUser-db'])
        cy.wait(['@users'])
        cy.get('#id').click()
        cy.wait(['@user'])
        cy.contains('username')
    })
})