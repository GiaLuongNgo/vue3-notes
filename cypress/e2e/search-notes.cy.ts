describe('Note Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="create-note-button"]').click();
    cy.get('[data-testid="note-textarea"]').type('Shopping list');
    cy.get('[data-testid="add-note-button"]').click();

    cy.get('[data-testid="create-note-button"]').click();
    cy.get('[data-testid="note-textarea"]').type('Meeting notes');
    cy.get('[data-testid="add-note-button"]').click();
  });

  it('finds notes by search term', () => {
    cy.get('[data-testid="search-bar_input"]').type('Shopping');
    cy.contains('Shopping list').should('be.visible');
    cy.contains('Meeting notes').should('not.exist');
  });

  it('shows all notes when search is cleared', () => {
    cy.get('[data-testid="search-bar_input"]').type('Shopping');
    cy.get('[data-testid="clear-search-button"]').click();
    cy.contains('Shopping list').should('be.visible');
    cy.contains('Meeting notes').should('be.visible');
  });
});
