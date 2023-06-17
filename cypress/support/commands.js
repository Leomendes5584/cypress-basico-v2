Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Mendes')
    cy.get('#email').type('leonardo@exemplo.com')
    cy.get('#open-text-area').type('O MEU CAMINHO')
    cy.get('button[type="submit"]').click()
})