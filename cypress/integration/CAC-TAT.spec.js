/// <reference  types="Cypress" />

beforeEach(() => {
  cy.visit("src/index.html");
});

describe("Central de atendimento ao cliente TAT", () => {
  it("verifica o titulo da aplicacao", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
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

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").type("leonardo.b.lima1.gmail.com", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
  });

  it("O campo telefone so deve apresentar valores numericos", () => {
    cy.get("#phone").type("Leonardo").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
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

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
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

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get("span.success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("youtube");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get("input[type='radio'][value='feedback']")
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get("input[type='radio']").each((input) => {
      cy.wrap(input).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type='checkbox']").as("checks").check();
    cy.get("@checks").each((inp) => {
      cy.wrap(inp).should("be.checked");
    });

    cy.get("@checks").last().uncheck().should("not.be.checked");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("input[type='checkbox'][value='phone']")
      .as("checkPhone")
      .check()
      .should("be.checked");

    cy.get("#phone").should("have.value", "");
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  });
});
