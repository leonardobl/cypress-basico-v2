/// <reference  types="Cypress" />

beforeEach(() => {
  cy.visit("src/index.html");
});

describe("Central de atendimento ao cliente TAT", () => {
  it("verifica o titulo da aplicacao", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();
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
    cy.tick(3000);
    cy.get("span.success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.get("#email").type("leonardo.b.lima1.gmail.com", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get("span.error").should("be.visible");
    cy.tick(3000);
    cy.get("span.error").should("not.be.visible");
  });

  it("O campo telefone so deve apresentar valores numericos", () => {
    cy.get("#phone").type("Leonardo").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();
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
    cy.tick(3000);
    cy.get("span.error").should("not.be.visible");
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

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']")
      .selectFile("cypress/fixtures/example.json")
      .then((inp) => expect(inp[0].files[0].name).to.be.equal("example.json"));
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']")
      .selectFile(
        {
          contents: "cypress/fixtures/example.json",
          fileName: "example.json",
        },
        { action: "drag-drop" }
      )
      .should((inp) => {
        expect(inp[0].files[0].name).to.be.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("exampleFile");
    cy.get("input[type='file']")
      .selectFile("@exampleFile")
      .should((inp) =>
        expect(inp[0].files[0].name).to.be.equal("example.json")
      );
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("a").invoke("removeAttr", "target").click();
    cy.title().should(
      "be.eq",
      "Central de Atendimento ao Cliente TAT - Política de privacidade"
    );
  });

  it("Executando o envio do formulario 5 vezes", () => {
    Cypress._.times(5, () => {
      cy.clock();
      cy.fillMandatoryFieldsAndSubmit();
      cy.tick(3000);
    });
  });

  it("exibe e esconde as mensagens de sucesso e erro usando o .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");

    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche a area de texto usando o comando invokepreenche a area de texto usando o comando invoke", () => {
    cy.get("#firstName")
      .should("have.value", "")
      .invoke("val", "Leonardo Lima")
      .should("have.value", "Leonardo Lima");

    const longString = Cypress._.repeat(
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... ",
      20
    );

    cy.get("#open-text-area")
      .should("have.value", "")
      .invoke("val", longString)
      .should("have.value", longString);
  });

  it("faz uma requisição HTTP", () => {
    cy.request({
      method: "GET",
      url: "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html",
    }).should((res) => {
      expect(res.status).to.equal(200);
      expect(res.statusText).to.equal("OK");
      expect(res.body).contains("CAC TAT");
    });
  });
});
