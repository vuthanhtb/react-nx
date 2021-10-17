describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary&args=title;'));

    it('should render the component', () => {
      cy.get('.MuiToolbar-root').should('contain', '');
    });
});
