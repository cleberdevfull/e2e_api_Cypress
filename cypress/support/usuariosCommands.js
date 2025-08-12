import { faker } from '@faker-js/faker';

Cypress.Commands.add('listarUsuarios', (token) => {
    cy.request({
        method: 'GET',
        url: 'usuarios',
        headers: { authorization: token },
    })
 
})

Cypress.Commands.add('cadastrarUsuario', (token, administrador) => {
       cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { authorization: token },
        body: {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('cadastrarUsuarioEmailInvalido', (token, administrador) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        headers: { authorization: token },
        body: {
            "nome": faker.person.fullName(),
            "email": 'EMAIL_invalido@abc.com.br.01',
            "password": faker.internet.password(),
            "administrador": administrador
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('editarCadastroUsuario', (token, id, administrador) => {
        cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        headers: { authorization: token },
        body: {
            "nome": "Cadastro editado",
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true'
        }
    })
})


Cypress.Commands.add('deletarUsuario', (token, id) => {
    return cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
        headers: { authorization: token }
      
    })
})