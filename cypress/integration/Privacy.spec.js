/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    Cypress._.times(3, () => {
        it('verifica o título da aplicação', function () {
            cy.contains('#title', 'CAC TAT - Política de privacidade')
        })
    })
})