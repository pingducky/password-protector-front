const urlPath = "http://localhost:5173/login";

const login = (username, password) => {
    cy.visit(urlPath);
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('[data-variant="filled"]').click();
};

const checkErrorMessage = (message) => {
    cy.get('#password-error').should('contain.text', message);
};

describe('Test de la page de login', () => {
    it('Quitte la page de login depuis le bouton inscr  iption dans la navbar pour aller sur la page de création de compte', () => {
        cy.visit(urlPath);
        cy.get('#registerNavBarButton').click();
        cy.get('#registerTitlePage').should('contain.text', "Espace d'inscription");
    });

    it('Quitte la page de login depuis le bouton "Se créer un compte" pour aller sur la page de création de compte', () => {
        cy.visit(urlPath);
        cy.get('#createAccountButton').click();
        cy.get('#registerTitlePage').should('contain.text', "Espace d'inscription");
    });

    it('Quitte la page de login pour aller sur la page pour resets le mot de passe', () => {
        cy.visit(urlPath);
        cy.get('#resetPasswordButton').click();
        cy.get('#resetPasswordTitle').should('contain.text', "Récupérer votre mot de passe");
    });


    it('Login avec l\'id vide et un mot de passe vide', () => {
        login(' ', ' ');
        checkErrorMessage('Identifiant ou mot de passe incorrect.');
    });

    it('Login avec l\'id valide et mot de passe vide', () => {
        login('mistervinvin', ' ');
        checkErrorMessage('Identifiant ou mot de passe incorrect.');
    });

    it('Login avec l\'id valide et mot de passe erroné', () => {
        login('mistervinvin', '123456');
        checkErrorMessage('Identifiant ou mot de passe incorrect.');
    });

    it('Login avec l\'id valide et mot de passe valide', () => {
        login('mistervinvin', '1234');
        cy.get('#addElementButton').should('contain.text', "Nouvel élément");
    });
});