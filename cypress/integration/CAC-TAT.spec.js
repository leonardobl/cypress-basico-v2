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
      .type("leonardo.b.lima1@gmail.com", { delay: 0 })
      .should("have.value", "leonardo.b.lima1@gmail.com");
    cy.get("#open-text-area")
      .type("Preciso de ajuda com a validacao de um formulario")
      .should(
        "have.value",
        "Preciso de ajuda com a validacao de um formulario"
      );

    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
  });
});

describe("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
  it("Deve apresenter a mensagem de erro", () => {
    cy.get("#email").type("leonardo.b.lima1.gmail.com", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
  });
});

describe("O campo telefone so deve apresentar valores numericos", () => {
  it("So deve aceitar valores numericos", () => {
    cy.get("#phone").type("Leonardo").should("have.value", "");
  });
});

describe("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
  it("Deve apresentar a mensagem de obrigatoriedade do envio do telefone", () => {
    cy.get("#firstName").type("Leonardo").should("have.value", "Leonardo");
    cy.get("#lastName")
      .type("Bernardo Lima")
      .should("have.value", "Bernardo Lima");
    cy.get("#email")
      .type("leonardo.b.lima1@gmail.com", { delay: 0 })
      .should("have.value", "leonardo.b.lima1@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area")
      .type("Preciso de ajuda com a validacao de um formulario")
      .should(
        "have.value",
        "Preciso de ajuda com a validacao de um formulario"
      );

    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
  });
});

describe("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
  it("Deve limpar os campos apos a digitacao", () => {
    cy.get("#firstName")
      .type("Leonardo")
      .should("have.value", "Leonardo")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Bernardo Lima")
      .should("have.value", "Bernardo Lima")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("leonardo.b.lima1@gmail.com")
      .should("have.value", "leonardo.b.lima1@gmail.com")
      .clear()
      .should("have.value", "");
  });
});

describe("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
  it("Deve apresentar a mensagem de erro ao clicar no botao enviar", () => {
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
  });
});

describe("envia o formuário com sucesso usando um comando customizado", () => {
  it("deve submeter o form com sucesso", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });
});
