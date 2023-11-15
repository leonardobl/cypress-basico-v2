/// <reference  types="Cypress" />

beforeEach(() => {
  cy.visit("src/index.html");
});

describe("Central de atendimento ao cliente TAT", () => {
  it("verifica o titulo da aplicacao", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
});

describe("preenche os campos obrigatórios e envia o formulário", () => {
  it("Deve apresentar o primeiro nome", () => {
    cy.get("#firstName").type("Leonardo").should("have.value", "Leonardo");
    cy.get("#lastName")
      .type("Bernardo Lima")
      .should("have.value", "Bernardo Lima");
    cy.get("#email")
      .type("leonardo.b.lima1@gmail.com")
      .should("have.value", "leonardo.b.lima1@gmail.com");
    cy.get("#open-text-area")
      .type("Preciso de ajuda com a validacao de um formulario")
      .should(
        "have.value",
        "Preciso de ajuda com a validacao de um formulario"
      );

    cy.get(".button").click();
    cy.get("span.success").should("be.visible");
  });
});
