describe('Brain Defrost Error Handling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.intercept('GET', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1',
      {
        statusCode: 201,
        fixture: 'patchedGame'
      }).as('getGame')
  })
  it('Displays error message if bad path visited', () => {
    cy.visit('http://localhost:3000/badpath')
    .get('.alert-img').should('exist')
    .get('.error-page').contains('h2', 'Uh oh!')
    .get('.error-page').contains('p', 'Page not found')
    .get('.error-close-btn').contains('Home').click()
    .url().should('eq', 'http://localhost:3000/')
    .get('.form-title').contains('Generate A New Trivia Game!')
  })
  it('Displays error message if game cannot be made because of server error', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 500,
        body: ''
      }).as('createGameServerErr')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .get('.alert-modal').contains('h2', 'Alert!')
    .get('.alert-modal').contains('p', 'Error: Server unavailable - please try again later')
    .get('.modal-close-btn').contains('Close').click()
    .get('alert-modal').should('not.exist')
  })
  it('Displays error message if game cannot be made because of client error', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 400,
        body: ''
      }).as('createGameClientErr')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .get('.alert-modal').contains('h2', 'Alert!')
    .get('.alert-modal').contains('p', 'Couldn\'t create game - 400')
    .get('.modal-close-btn').contains('Close').click()
    .get('alert-modal').should('not.exist')
  })
  it('Displays message if display name is taken', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    cy.visit('http://localhost:3000/join/1/?data=%7B"id"%3A1%2C"type"%3A"game"%2C"attributes"%3A%7B"link"%3A"www.example.com"%2C"started"%3Afalse%2C"number_of_questions"%3A8%2C"number_of_players"%3A7%2C"topic"%3A"music"%2C"time_limit"%3A30%7D%2C"relationships"%3A%7B"players"%3A%7B"data"%3A%5B%7B"id"%3A1%2C"type"%3A"player"%2C"attributes"%3A%7B"display_name"%3A"creator"%2C"answers_correct"%3A0%2C"answers_incorrect"%3A0%2C"questions_correct"%3A%5B%5D%7D%7D%5D%7D%2C"questions"%3A%7B"data"%3A%5B%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20lead%20vocalist%20of%20The%20Beatles%3F"%2C"question_number"%3A1%2C"answer"%3A"John%20Lennon"%2C"options"%3A%5B"Paul%20McCartney"%2C"George%20Harrison"%2C"Ringo%20Starr"%2C"John%20Lennon"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20artist%20is%20known%20as%20the%20%27Queen%20of%20Pop%27%3F"%2C"question_number"%3A2%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Beyonce"%2C"Taylor%20Swift"%2C"Adele"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20instrument%20does%20Elton%20John%20famously%20play%3F"%2C"question_number"%3A3%2C"answer"%3A"Piano"%2C"options"%3A%5B"Guitar"%2C"Drums"%2C"Violin"%2C"Piano"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20song%20by%20Michael%20Jackson%20features%20a%20famous%20zombie%20dance%3F"%2C"question_number"%3A4%2C"answer"%3A"Thriller"%2C"options"%3A%5B"Beat%20It"%2C"Billie%20Jean"%2C"Smooth%20Criminal"%2C"Thriller"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20genre%20of%20music%20did%20Elvis%20Presley%20become%20famous%20for%3F"%2C"question_number"%3A5%2C"answer"%3A"Rock%20n%27%20Roll"%2C"options"%3A%5B"Jazz"%2C"Blues"%2C"Country"%2C"Rock%20n%27%20Roll"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20band%20released%20the%20album%20%27Dark%20Side%20of%20the%20Moon%27%3F"%2C"question_number"%3A6%2C"answer"%3A"Pink%20Floyd"%2C"options"%3A%5B"Led%20Zeppelin"%2C"The%20Rolling%20Stones"%2C"The%20Beatles"%2C"Pink%20Floyd"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20best-selling%20female%20artist%20of%20all%20time%3F"%2C"question_number"%3A7%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Celine%20Dion"%2C"Whitney%20Houston"%2C"Mariah%20Carey"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20is%20the%20name%20of%20Rihanna%27s%20debut%20single%3F"%2C"question_number"%3A8%2C"answer"%3A"Pon%20de%20Replay"%2C"options"%3A%5B"Umbrella"%2C"Diamonds"%2C"Love%20on%20the%20Brain"%2C"Pon%20de%20Replay"%5D%7D%7D%5D%7D%7D%7D')
    .get('#display-name-input').type('creator').should('have.value', 'creator')
    .get('#display-name-notif').contains('That display name is taken. Please choose another one!')
  })
  it('Displays error message if game cannot be joined', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
    {
      statusCode: 201,
      fixture: 'createdGame'
    }).as('createGame')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1/players',
      {
        statusCode: 403,
        body: ''
      }).as('createPlayerClientErr')
    cy.visit('http://localhost:3000/join/1/?data=%7B"id"%3A1%2C"type"%3A"game"%2C"attributes"%3A%7B"link"%3A"www.example.com"%2C"started"%3Afalse%2C"number_of_questions"%3A8%2C"number_of_players"%3A7%2C"topic"%3A"music"%2C"time_limit"%3A30%7D%2C"relationships"%3A%7B"players"%3A%7B"data"%3A%5B%7B"id"%3A1%2C"type"%3A"player"%2C"attributes"%3A%7B"display_name"%3A"creator"%2C"answers_correct"%3A0%2C"answers_incorrect"%3A0%2C"questions_correct"%3A%5B%5D%7D%7D%5D%7D%2C"questions"%3A%7B"data"%3A%5B%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20lead%20vocalist%20of%20The%20Beatles%3F"%2C"question_number"%3A1%2C"answer"%3A"John%20Lennon"%2C"options"%3A%5B"Paul%20McCartney"%2C"George%20Harrison"%2C"Ringo%20Starr"%2C"John%20Lennon"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20artist%20is%20known%20as%20the%20%27Queen%20of%20Pop%27%3F"%2C"question_number"%3A2%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Beyonce"%2C"Taylor%20Swift"%2C"Adele"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20instrument%20does%20Elton%20John%20famously%20play%3F"%2C"question_number"%3A3%2C"answer"%3A"Piano"%2C"options"%3A%5B"Guitar"%2C"Drums"%2C"Violin"%2C"Piano"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20song%20by%20Michael%20Jackson%20features%20a%20famous%20zombie%20dance%3F"%2C"question_number"%3A4%2C"answer"%3A"Thriller"%2C"options"%3A%5B"Beat%20It"%2C"Billie%20Jean"%2C"Smooth%20Criminal"%2C"Thriller"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20genre%20of%20music%20did%20Elvis%20Presley%20become%20famous%20for%3F"%2C"question_number"%3A5%2C"answer"%3A"Rock%20n%27%20Roll"%2C"options"%3A%5B"Jazz"%2C"Blues"%2C"Country"%2C"Rock%20n%27%20Roll"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20band%20released%20the%20album%20%27Dark%20Side%20of%20the%20Moon%27%3F"%2C"question_number"%3A6%2C"answer"%3A"Pink%20Floyd"%2C"options"%3A%5B"Led%20Zeppelin"%2C"The%20Rolling%20Stones"%2C"The%20Beatles"%2C"Pink%20Floyd"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20best-selling%20female%20artist%20of%20all%20time%3F"%2C"question_number"%3A7%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Celine%20Dion"%2C"Whitney%20Houston"%2C"Mariah%20Carey"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20is%20the%20name%20of%20Rihanna%27s%20debut%20single%3F"%2C"question_number"%3A8%2C"answer"%3A"Pon%20de%20Replay"%2C"options"%3A%5B"Umbrella"%2C"Diamonds"%2C"Love%20on%20the%20Brain"%2C"Pon%20de%20Replay"%5D%7D%7D%5D%7D%7D%7D')
    .get('#display-name-input').type('student1').should('have.value', 'student1')
    .get('#join-game-button').click()
    .get('.alert-modal').contains('h2', 'Alert!')
    .get('.alert-modal').contains('p', 'Max players reached')
    .get('.modal-close-btn').contains('Home').click()
    .get('alert-modal').should('not.exist')
    .get('.form-title').contains('Generate A New Trivia Game!')
  })
  it('Displays error message if game cannot be started', () => {
    cy.intercept('POST', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.intercept('PATCH', 'https://brain-defrost-f8afea5ead0a.herokuapp.com/api/v1/games/1',
      {
        statusCode: 500,
        body: ''
      }).as('startGameServerErr')
    cy.visit('http://localhost:3000')
    .get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .get('.start-game-btn').click()
    .get('.alert-modal').contains('h2', 'Alert!')
    .get('.alert-modal').contains('p', 'Couldn\'t start game - 500')
    .get('.modal-close-btn').contains('Close').click()
    .get('alert-modal').should('not.exist')
  })
})