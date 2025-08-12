/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import usuariosSchema from "../contratos/usuarios.contratos";

describe('Testes da Funcionalidade Usuários', () => {

  before(function () {
    return cy.token('fulano@qa.com', 'teste').then(token => {
      this.token = token;
      return cy.cadastrarUsuario(token, faker.person.fullName(), faker.internet.email(), faker.internet.password(), true)
        .then(response => {
          expect(response.status).to.equal(201)
          this.idUsuario = response.body._id;
        });
    });
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return usuariosSchema.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', function () {
    cy.listarUsuarios(this.token).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', function () {
    expect(this.idUsuario).to.exist;
  });


  it('Deve validar um usuário com email inválido', function () {
    cy.cadastrarUsuarioEmailInvalido(this.token, 'EMAIL_invalido@abc.com.br.01', true).then(response => {
      expect(response.status).to.equal(400)
      expect(response.body.email).to.equal('email deve ser um email válido')
    })
  });

  it('Deve editar um usuário previamente cadastrado', function () {
    cy.editarCadastroUsuario(this.token, this.idUsuario, 'Cadastro editado', faker.internet.password(), true)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Registro alterado com sucesso')
      });
  });

  it('Deve deletar um usuário previamente cadastrado', function () {
    cy.deletarUsuario(this.token, this.idUsuario).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Registro excluído com sucesso')
    });
  });
});
