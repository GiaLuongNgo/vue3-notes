describe('Note Sorting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="create-note-button"]').click();
    cy.get('[data-testid="note-textarea"]').type('Older note');
    cy.get('[data-testid="add-note-button"]').click();

    cy.get('[data-testid="create-note-button"]').click();
    cy.get('[data-testid="note-textarea"]').type('Newer note');
    cy.get('[data-testid="add-note-button"]').click();
  });

  it('changes note order when sort button is clicked', () => {
    cy.get('[data-testid="note-items"]').last().should('contain', 'Older note');

    cy.get('[data-testid="sort-control"]').click();

    cy.get('[data-testid="note-items"]').last().should('contain', 'Newer note');
  });
});
