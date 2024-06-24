const urlPath = "http://localhost:5173/resetPassword";

describe('Test de la page de réinitialisation du mot de passe.', () => {
    it('Email invalide', () => {
        cy.visit(urlPath);
        cy.get('#email').type('email');
        cy.get('#resetPasswordButton').click();
        cy.get('#email-error').should('contain.text', 'Le format de l\'email est invalide');
    });

    it('Back to login', () => {
        cy.visit(urlPath);
        cy.get('#backToLoginButton').click();
        cy.get('#connexionSpace').should('contain.text', 'Espace de connexion');
    });
});