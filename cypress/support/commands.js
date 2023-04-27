Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, text) => {
    cy.get('#firstName').type(firstName, { delay: 0 })
    cy.get('#lastName').type(lastName, { delay: 0 })
    cy.get('#email').type(email, { delay: 0 })
    cy.get('#open-text-area').type(text, { delay: 0 })
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('selectOptionText', (text) => {
    cy.get('#product')
    .select(text)
    .should('have.value', 'youtube')
});

Cypress.Commands.add('selectOptionValue', (value) => {
    cy.get('#product')
    .select(value)
    .should('have.value', value)
});

Cypress.Commands.add('selectOptionIndex', (index) => {
    cy.get('#product')
    .select(index)
    .should('have.value', 'blog')
});

Cypress.Commands.add('selectRandomOption', () => {
    cy.get('#product option').then(options => {
        const randomIndex = Cypress._.random(1, options.length - 1)
        cy.get('select')
        .select(options[randomIndex].value)
    })
});

Cypress.Commands.add('selectRadioButton', (value) => {
    cy.get(`input[type="radio"][value=${value}]`)
    .check()
    .should('be.checked')
});

Cypress.Commands.add('selectRandomRadioButton', () => {
    cy.get('#support-type label input').then(options => {
        const randomIndex = Cypress._.random(options.length - 1)
        cy.get('input[type="radio"]')
        .check(options[randomIndex].value)
        .should('be.checked')
    })
});