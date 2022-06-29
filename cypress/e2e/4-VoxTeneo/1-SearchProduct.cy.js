/// <reference types="cypress" />

describe('Searching Product', () => {
    it('search for exact product', () => {
        cy.visit('http://automationpractice.com/index.php')

        // let's search for 'blouse'
        cy.get('#search_query_top').type('blouse{enter}')
        cy.wait(2000)

        // verify the url contain word blouse
        cy.url().should('contain', 'blouse')

        // verify the search title is correct
        cy.get('#center_column > h1 > span.lighter').should('contain', 'blouse')

        // verify it only shows 1 item
        cy.get('#center_column > ul').children().should('have.length', 1)

        // verify the shown item is correct
        cy.get('#center_column > ul > li > div > div.right-block > h5 > a').should('contain.text', 'Blouse')
    })

    it('search for text containing multiple items', () => {
        cy.visit('http://automationpractice.com/index.php')

        // let's search for 'dress'
        cy.get('#search_query_top').type('dress{enter}')
        cy.wait(2000)

         // verify the url contain word blouse
         cy.url().should('contain', 'dress')

         // verify the search title is correct
         cy.get('#center_column > h1 > span.lighter').should('contain', 'dress')
 
         // verify it shows 7 items
         cy.get('#center_column > ul').children().should('have.length', 7)
 
         // verify that each items contains word Dress
        for(var i = 1; i <= cy.get('#center_column > ul').children().length; i++) {
            cy.get('//*[@id="center_column"]/ul/li[' + i + ']/div/div[2]/h5/a').should('contain.text', 'dress')
        }
    })

    it('search by selection suggestion', () => {
        cy.visit('http://automationpractice.com/index.php')

        // let's trigger by typing 'dre'
        cy.get('#search_query_top').type('dre')
        cy.wait(7000)
        
        // since i still don't know how to handle auto complete, i'll just use down arrow
        cy.get('#search_query_top').type('{downarrow}{downarrow}{downarrow}{enter}')

        // Verify the searched item is correct
        cy.get('#center_column > div > div > div.pb-center-column.col-xs-12.col-sm-4 > h1')
        .should('contain.text', 'Dress')
    })
})