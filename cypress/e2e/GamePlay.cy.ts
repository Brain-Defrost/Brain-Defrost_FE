describe('Brain Defrost GamePlay Stories', () => {
  it('Allows user to start and play game', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.intercept('PATCH', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1',
    {
      statusCode: 200,
      fixture: 'patchedGame'
    }).as('startGame')
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1',
      {
        statusCode: 201,
        fixture: 'patchedGame'
      }).as('getGame')
    cy.intercept('PATCH', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players/1',
      {
        statusCode: 200,
        fixture: 'patchedPlayer1'
      }).as('updatePlayer1')
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players',
      {
        statusCode: 200,
        fixture: 'intermissionResponse'
      }).as('getIntermission')
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/stats',
    {
      statusCode: 200,
      fixture: 'gameStats'
    }).as('getStats')
    cy.visit('http://localhost:3000/')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()

    .get('.start-game-btn').click()
    .url().should('include', 'game/play/1')
    .get('.question').contains('Who is the lead vocalist of The Beatles?')
    .get('.question-form').children().should('have.length', 5)
    .get('.time-left').contains('20')
    .get('.question-number').contains(1)
    .get('label[for=option0]').contains('Paul McCartney')
    .get('#option0').should('have.value', 'Paul McCartney')
    .get('label[for=option1]').contains('George Harrison')
    .get('#option1').should('have.value', 'George Harrison')
    .get('label[for=option2]').contains('Ringo Starr')
    .get('#option2').should('have.value', 'Ringo Starr')
    .get('label[for=option3]').contains('John Lennon')
    .get('#option3').should('have.value', 'John Lennon').click()
    .get('.submit-answer-btn').contains('Lock in?').click().contains('Locked In')
    .get('.submit-answer-btn').should('be.disabled')
    cy.wait(20000)

    .get('.correct-answer-holder').contains('h2', 'The Correct Answer Is:')
    .get('.correct-answer-holder').contains('h3', 'John Lennon')
    .get('.correct-player-display').contains('h2', 'Who got It Right?')
    .get('.correct-player-display').contains('ul', 'creator')
    cy.wait(5000)

    .get('.question').contains('Which artist is known as the \'Queen of Pop\'?')
    .get('.question-form').children().should('have.length', 5)
    .get('.time-left').contains('20')
    .get('.question-number').contains(2)
    .get('label[for=option0]').contains('Beyonce')
    .get('#option0').should('have.value', 'Beyonce').click()
    .get('label[for=option1]').contains('Taylor Swift')
    .get('#option1').should('have.value', 'Taylor Swift')
    .get('label[for=option2]').contains('Adele')
    .get('#option2').should('have.value', 'Adele')
    .get('label[for=option3]').contains('Madonna')
    .get('#option3').should('have.value', 'Madonna')
    .get('.submit-answer-btn').contains('Lock in?').click().contains('Locked In')
    .get('.submit-answer-btn').should('be.disabled')
    cy.wait(20000)

    .get('.correct-answer-holder').contains('h2', 'The Correct Answer Is:')
    .get('.correct-answer-holder').contains('h3', 'Madonna')
    .get('.correct-player-display').contains('h2', 'Who got It Right?')
    .get('.correct-player-display').contains('ul', 'No one got it right!')
    cy.wait(5000)

    .url().should('include', 'game/results/1')
    .get('h1').contains('Good game!')
    .get('.rankings-list').children().should('have.length', 3)
    .get('.rankings-list').contains('student2 2Pts')
    .get('.rankings-list').contains('creator 1Pts')
    .get('.rankings-list').contains('student1 0Pts')
    .get('.top-three').children().should('have.length', 3)
    .get('.second-place').contains('h3', 'creator')
    .get('.second').contains('2nd')
    .get('.first-place').contains('h3', 'student2')
    .get('.first').contains('1st')
    .get('.third-place').contains('h3', 'student1')
    .get('.third').contains('3rd')
    .get('.new-game-btn').contains('Generate A New Game')
    .get('.send-stats-btn').contains('Send Me The Stats')
    
  })
  it('Allows user to submit email address to receive copy of the results', () => {
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/stats',
    {
      statusCode: 200,
      fixture: 'gameStats'
    }).as('getStats')
    //stub email address post request
    cy.visit('http://localhost:3000/game/results/1')
    .get('.send-stats-btn').contains('Send Me The Stats').click()
    .get('.form-message').contains('Send me those stats!')
    .get('label[for=email]').contains('Enter your Email Address')
    .get('#email').should('have.value', '').type('frosty@example.com').should('have.value', 'frosty@example.com')
    .get('.submit-btn').click()
    //check that confirmation message is displayed
    .get('.close-btn').click()
    .get('.form-modal').should('not.exist')
  })
  // it('Allows non-creator player to play game', () => {
    
  // })
})