/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Querying', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    it('cy.get() continue button and click', () => {
        cy.server();

        // Listen to GET to posts/1
        cy.route('GET', 'posts/*').as('getPosts');

        // wait for GET posts/1
        // cy.wait('@getPosts')
        //     .its('status')
        //     .should('eq', 200);
        cy.wait(8000)

        cy.get('#btnContinue').click();
    });
});
