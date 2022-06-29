describe('My First Test', function () {
	it('clicks the link "Trade"', function () {
		cy.visit('/');
		cy.contains('Trade').click();
	});

	it('Can login', function () {
		cy.contains('Sign In').click();
		cy.get('input[type=email]').type('sirius.oito@gmail.com');
		cy.get('input[type=password]').type('132Mudar@');
		cy.get('input[type=submit]').click();
	});
});
