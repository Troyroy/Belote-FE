describe("Testing Login", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("input[id=email]").type("georgievtroan@gmail.com");

    // {enter} causes the form to submit
    cy.get("input[id=password]").type(`${"password123"}{enter}`, {
      log: false,
    });

    cy.url().should("include", "/selectGame");
    cy.get("button[id=VSAI]").click();

    cy.url().should("include", "/game");

    // check for token
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "token")
      .should("exist");
  });
});

describe("Testing create BOT game", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("input[id=email]").type("georgievtroan@gmail.com");

    // {enter} causes the form to submit
    cy.get("input[id=password]").type(`${"password123"}{enter}`, {
      log: false,
    });

    cy.url().should("include", "/selectGame");
    cy.get("button[id=VSAI]").click();

    cy.url().should("include", "/game");

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "gameID")
      .should("exist");
  });
});
