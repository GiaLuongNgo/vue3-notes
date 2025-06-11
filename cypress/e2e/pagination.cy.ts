describe('Note Pagination', () => {
  beforeEach(() => {
    cy.visit('/');
    for (let i = 1; i <= 14; i++) {
      cy.get('[data-testid="create-note-button"]').click();
      cy.get('[data-testid="note-textarea"]').type(`Note ${i}`);
      cy.get('[data-testid="add-note-button"]').click();
    }
  });

  it('shows different notes on different pages', () => {
    cy.contains('Note 10').should('be.visible');

    cy.get('[data-testid="pagination-button-1"]').click();

    cy.contains('Note 14').should('be.visible');
  });
});
