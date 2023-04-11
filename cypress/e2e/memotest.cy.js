/// <reference types="cypress" />

context("Dentro del juego memotest", () => {
  before(() => {
    cy.visit("192.168.0.128:8080");
  });

  it("Resuelve el juego", () => {
    cy.get(".tarjeta-boca-arriba").click();
    
  });
});
