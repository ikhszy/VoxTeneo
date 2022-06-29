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

        // go to women section
        cy.get('.sf-menu > :nth-child(1) > [href="http://automationpractice.com/index.php?id_category=3&controller=category"]')
        .click()

        // add multiple items from women section
        for(var i = 1; i <= 3; i++) {
            cy.get(':nth-child(' + i + ') > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span')
            .click()
            cy.wait(2000)
            cy.get('.continue > span').click()
        }

        // checkout
        cy.get('#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a')
        .trigger('mouseover').get('#button_order_cart').click()

        cy.get('.cart_navigation > .button > span').click()
        cy.get('.cart_navigation > .button > span').click()

        // agreeing ToS
        cy.get('#cgv').check()
        cy.get('.cart_navigation > .button > span').click()

        // payment by bank wire
        cy.get('.bankwire').click()

        // confirm order
        cy.get('.page-subheading').should('contain.text', 'wire')
        cy.get('.cart_navigation > .button > span').click()

        // finish order
        cy.get('.cheque-indent > .dark').should('be.visible')


    })
})