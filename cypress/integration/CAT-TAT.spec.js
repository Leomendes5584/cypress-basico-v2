/// <reference types="Cypress" />




describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('leonardo@exemplo.com')
        cy.get('#open-text-area').type('O MEU CAMINHO', { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('leonardo@exemplo,com')
        cy.get('#open-text-area').type('O MEU CAMINHO')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchino com valor não numérico', function () {
        cy.get('#phone')
            .type('dhasudha')
            .should('have.value', '')
    })

    it('xibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function () {
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Mendes')
        cy.get('#email').type('leonardo@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('O MEU CAMINHO')
        cy.contains('button', 'Enviar').click() //USANDO CONTAINS, ELE AJUDA IDENTIFICAR O BOTÃO E A INFORMAÇÃO QUE CONTÉM

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Leonardo')
            .should('have.value', 'Leonardo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Mendes')
            .should('have.value', 'Mendes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('leonardo@exemplo.com')
            .should('have.value', 'leonardo@exemplo.com')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('enviar o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

})