/// <reference types="cypress" />

describe('e2e order', () => {
    it('start from login and finish the order process', () => {
        cy.clearCookies()
        cy.clearLocalStorage()
        
        // start with login
        cy.visit('http://automationpractice.com/index.php?controller=my-account')
        cy.get('#email').type('jankenponggg1@gmail.com')
        cy.get('#passwd').type('janken345')
        cy.get('#SubmitLogin').click()

        // verify that we successfully login
        cy.get('.page-heading').should('contain.text', 'My account')

        // enter the profile menu
        cy.get('.myaccount-link-list > :nth-child(4) > a > span').click()

        // enter the original password
        cy.get('#old_passwd').type('janken345')

        // verify the changes on password
        cy.get('#passwd').type('janken345')
        cy.get('#confirmation').type('janken345')

        // save the changes
        cy.get(':nth-child(11) > .btn > span').click()
        cy.get('.alert').should('contain.text', 'Your personal information')

        // logout
        cy.get('.logout').click()

        // try logging in using new password
        cy.get('#email').type('jankenponggg1@gmail.com')
        cy.get('#passwd').type('janken345')
        cy.get('#SubmitLogin').click()

        // verify login success
        cy.get('.page-heading').should('contain.text', 'My account')
    })
})