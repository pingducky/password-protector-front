const urlPath = "http://localhost:5173/register";


describe('Test de la page d\'inscription.', () => {
    it('Test de chargement de la page d\'inscription', () => {
        cy.visit(urlPath);
        cy.get('#registerTitlePage').should('contain.text', 'Espace d\'inscription');
    });

    it('Test champs invalident', () => {
        cy.visit(urlPath);
        cy.get('#email').type('toto');
        cy.get('#username').type(' ');
        cy.get('#lastname').type(' ');
        cy.get('#firstname').type(' ');
        cy.get('#password').type(' ');
        cy.get('#passwordConfirmation').type(' ');
        cy.get('#submit').click();
        cy.get('#email-error').should('contain.text', 'Adresse email invalide');
        cy.get('#password-error').should('contain.text', 'Le mot de passe doit contenir au minimum 8 caractères');
    });

    it('Test de validation de l\'email', () => {
        cy.visit(urlPath);
        cy.get('#email').type('toto');
        cy.get('#username').type('fakeUserName');
        cy.get('#email-error').should('contain.text', 'Adresse email invalide');

    });

    it('Test avec deux mots de passe différents', () => {
        cy.visit(urlPath);
        cy.get('#password').type('12Abcd@test');
        cy.get('#passwordConfirmation').type('1234Abcd@test');
        cy.get('#submit').click();
        cy.get('#passwordConfirmation-error').should('contain.text', 'Les mots de passe ne correspondent pas');
    });

    it('Test de la validation du nom et prénom', () => {
        cy.visit(urlPath);
        cy.get('#email').type('toto@gmail.com');
        cy.get('#username').type('pingducky');
        cy.get('#lastname').type(' ');
        cy.get('#firstname').type(' ');
        cy.get('#password').type('SuperP@ssword1234');
        cy.get('#passwordConfirmation').type('SuperP@ssword1234');
        cy.get('#submit').click();
    });

    it('Test de soumission réussis avec redirection sur la page de login', () => {
        cy.visit(urlPath);
        cy.get('#email').type('toto@gmail.com');
        cy.get('#username').type('pingducky');
        cy.get('#lastname').type('Hugo');
        cy.get('#firstname').type('Pigeon');
        cy.get('#password').type('SuperP@ssword1234');
        cy.get('#passwordConfirmation').type('SuperP@ssword1234');
        cy.get('#submit').click();
        cy.get('#connexionSpace').should('contain.text', 'Espace de connexion');
    });
});