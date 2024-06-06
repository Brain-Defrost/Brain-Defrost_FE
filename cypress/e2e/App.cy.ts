describe('Brain Defrost User Stories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1',
      {
        statusCode: 201,
        fixture: 'patchedGame'
      }).as('getGame')
  })
  it('Displays homepage', () => {
    cy.get('h1').contains('Brain Defrost')
    .get('.form-title').contains('Generate A New Trivia Game!')
    .get('label[for=name]').contains('Enter your display name')
    .get('#name').should('have.value', '')
    .get('label[for=topic]').contains('Topic')
    .get('#topic').should('have.value', '')
    .get('label[for=players]').contains('How many players')
    .get('#players').should('have.value', '1')
    .get('label[for=questions]').contains('How many Questions')
    .get('#questions').should('have.value', '1')
    .get('.create-btn').contains('Create')
    .get('.footer-title').contains('More info about Brain Defrost')
  })
  it('Allows user to generate a new game and see lobby', () => {
    // cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
    //   {
    //     statusCode: 201,
    //     fixture: 'createdGame'
    //   }).as('createGame')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .url().should('eq', 'http://localhost:3000/game/lobby/1')
    .get('.game-topic').contains('music')
    .get('.question-count').contains('2 Questions')
    .get('.join-url-heading').contains('Share the Link to invite players!')
    .get('.join-url-container').children().should('have.length', 2)
    .get('.join-url').contains('Copy Link')
    //test copy functionality
    .get('.start-game-btn').contains('Start Game!')
    .get('.players-heading').contains('Players')
    .get('.players').contains('p', 'creator')
  })
  it('Allows user to join a game', () => {
    // cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
    //   {
    //     statusCode: 201,
    //     fixture: 'createdGame'
    //   }).as('createGame')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players',
      {
        statusCode: 201,
        fixture: 'createdPlayer2'
      }).as('createPlayer')
    cy.visit('http://localhost:3000/join/1/')
    .get('.entry-form-header').contains('Join the Game!')
    .get('#display-name-input').type('student1').should('have.value', 'student1')
    .get('#join-game-button').click()
    .url().should('eq', 'http://localhost:3000/game/lobby/1')
    .get('.game-topic').contains('music')
    .get('.question-count').contains('2 Questions')
    .get('.join-url-heading').contains('Share the Link to invite players!')
    .get('.join-url-container').children().should('have.length', 2)
    .get('.join-url').contains('Copy Link')
    .get('.start-game-btn').contains('Start Game!')
    .get('.players-heading').contains('Players')
    .get('.players').contains('p', 'creator')
    .get('.players').contains('p', 'student1')
  })
})