describe('Note Creation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('creates a note successfully', () => {
    cy.get('[data-testid="create-note-button"]').click();
    cy.get('[data-testid="note-textarea"]').type('My first note');
    cy.get('[data-testid="add-note-button"]').click();
    cy.contains('My first note').should('exist');
  });
});
