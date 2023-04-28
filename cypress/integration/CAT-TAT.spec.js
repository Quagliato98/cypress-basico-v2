/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000

    context('Desktop Resolution (1920x768)', () => {
        beforeEach(() => {
            cy.visit('./src/index.html')
        })

        it('verifica o título da aplicação', function () {
            cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        })

        it('preenche os campos obrigatórios e envia o formulário', function () {
            const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
            cy.clock()
            cy.get('#firstName').type('Andrey', { delay: 0 })
            cy.get('#lastName').type('Quagliato', { delay: 0 })
            cy.get('#email').type('teste@teste.com', { delay: 0 })
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.contains('button', 'Enviar').click()
            cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
            cy.clock()
            cy.get('#firstName').type('Andrey', { delay: 0 })
            cy.get('#lastName').type('Quagliato', { delay: 0 })
            cy.get('#email').type('Teste', { delay: 0 })
            cy.get('#open-text-area').type('Teste', { delay: 0 })
            cy.contains('button', 'Enviar').click()
            cy.contains('.error', 'Valide os campos obrigatórios!')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

        it('o campo Telefone não permite caracteres de texto', () => {
            cy.get('#firstName').type('Andrey', { delay: 0 })
            cy.get('#lastName').type('Quagliato', { delay: 0 })
            cy.get('#email').type('Teste', { delay: 0 })
            cy.get('#phone')
                .type('Teste')
                .should('have.value', '')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
            cy.clock()
            cy.get('#firstName').type('Andrey', { delay: 0 })
            cy.get('#lastName').type('Quagliato', { delay: 0 })
            cy.get('#email').type('teste@teste.com', { delay: 0 })
            cy.get('#phone-checkbox').check()
            cy.contains('button', 'Enviar').click()
            cy.contains('.error', 'Valide os campos obrigatórios!')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

        it('limpeza dos campos obrigatórios', () => {
            cy.get('#firstName').type('Andrey', { delay: 0 })
                .should('have.value', 'Andrey')
                .clear()
                .should('have.value', '')
            cy.get('#lastName').type('Quagliato', { delay: 0 })
                .should('have.value', 'Quagliato')
                .clear()
                .should('have.value', '')
            cy.get('#email').type('teste@teste.com', { delay: 0 })
                .should('have.value', 'teste@teste.com')
                .clear()
                .should('have.value', '')
            cy.get('#phone-checkbox').check()
            cy.contains('button', 'Enviar').click()
            cy.get('#phone')
                .type('5599999999', { delay: 0 })
                .should('have.value', '5599999999')
                .clear()
                .should('have.value', '')
            cy.get('#open-text-area').type('Teste', { delay: 0 })
                .should('have.value', 'Teste')
                .clear()
                .should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
            cy.clock()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').contains('Valide os campos obrigatórios!')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })

        it('envia o formulário com sucesso usando um comando customizado', () => {
            cy.clock()
            cy.fillMandatoryFieldsAndSubmit('Andrey', 'Quagliato', 'teste@teste.com', 'Teste')
            cy.contains('.success', 'Mensagem enviada com sucesso.')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })

        it('seleciona um produto (YouTube) por seu texto', () => {
            cy.selectOptionText('YouTube')
        })

        it('seleciona um produto (Mentoria) por seu valor (value)', () => {
            cy.selectOptionValue('mentoria')
        })

        it('seleciona um produto (Blog) por seu índice (index)', () => {
            cy.selectOptionIndex(1)
        })

        it('seleciona um produto de maneira aleatória', () => {
            cy.selectRandomOption()
        })

        it('marca o tipo de atendimento "Feedback"', () => {
            cy.selectRadioButton('feedback')
        })

        it('marca o tipo de atendimento "Ajuda"', () => {
            cy.selectRadioButton('ajuda')
        })

        it('marca o tipo de atendimento "Elogio"', () => {
            cy.selectRadioButton('elogio')
        })

        it('marca o tipo de atendimento de maneira randômica', () => {
            cy.selectRandomRadioButton()
        })

        it('marca cada tipo de atendimento', () => {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(($radio) => {
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
        })

        it('marca ambos checkboxes, depois desmarca o último', () => {
            cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
                .last()
                .uncheck()
                .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', () => {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('cypress/fixtures/example.json')
                .should(($input) => {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('seleciona um arquivo simulando um drag-and-drop', () => {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
                .should(($input) => {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
                .selectFile('@sampleFile')
                .should(($input) => {
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()
            cy.contains('#title', 'CAC TAT - Política de privacidade')
        })

        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
            cy.get('.success')
                .should('not.be.visible')
                .invoke('show')
                .should('be.visible')
                .and('contain', 'Mensagem enviada com sucesso.')
                .invoke('hide')
                .should('not.be.visible')
            cy.get('.error')
                .should('not.be.visible')
                .invoke('show')
                .should('be.visible')
                .and('contain', 'Valide os campos obrigatórios!')
                .invoke('hide')
                .should('not.be.visible')
        })

        it('faz uma requisição HTTP', () => {
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should((response) => {
                    const { status, statusText, body } = response

                    expect(status).to.equal(200)
                    expect(statusText).to.equal('OK')
                    expect(body).to.include('CAC TAT')
                })
        })

        it.only('encontrar o gato', () => {
            cy.get('#cat')
                .invoke('show')
                .should('be.visible')
        })
    })
})