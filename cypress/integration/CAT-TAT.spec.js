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
        cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {  ///Elementos do tipo RADIO
        cy.get('input[type="radio"]')                     ///Aqui ele pega todos elementos do tipo RADIO = 3
            .should('have.length', 3)                     ///Aqui ele verifica que realmente são, 3 na lista
            .each(function ($radio) {                      ///Aqui o Each recebe função como argumento=passar por cada elemento do tipo RADIO
                cy.wrap($radio).check()                   ///Aqui ele marca cada um por vez 
                cy.wrap($radio).should('be.checked')      ///Aqui ele verifica que cada um foi marcado
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function (){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {                                            ///Verificação
            expect($input[0].files[0].name).to.equal('example.json')          ///Verificação
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function (){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{ action : 'drag-drop' }) ///dra-drop arrasta o arquivo
        .should(function($input) {                   
            expect($input[0].files[0].name).to.equal('example.json')        
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
        cy.fixture('example.json').as('sampleFile')   ///cypress já tem a função fixture, ALIAS: dou o nome dessa fixture de SAMPLEFILE <- achei e mudei o arqv antes de rodar o codg
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')                   ///agora eu chamo o SAMPLEFILE
        .should(function($input) {                 
            expect($input[0].files[0].name).to.equal('example.json')     
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')   ///pagina abre, porém em outra ABA.... attr = atributo
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a')
         .invoke('removeAttr', 'target')    ///target removiada = pagina abre na mesma Aba do teste, assim consigo trabalhar 
         .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
    
    it.only('testa a página da política de privacidade de forma independente', function(){
         cy.visit('./src/privacy.html')
    })
})