# <p align="center">🧠Brain Defrost🥶</p>

<p align="center">This app allows a player to create a trivia game to get the brain going in a quick and easy way! The app provides a list of AI-generated multiple choice trivia questions about your topic of choice and shows you how you did at the end of the game. New features include a responsive app design and an option to receive game stats via email!
</p>

<p align="center">Version: 1.0</p>

## Preview:
<div align="center">
  <img src=".github/BrainDefrost1.0 Demo.gif" alt="app demo">

</div>


<p align="center">Technologies Used</p>
<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" alt="typescript badge">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge" alt="html badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge" alt="css badge">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge" alt="react badge">
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge" alt="router badge">
  <img src="https://img.shields.io/badge/Cypress-69D3A7?logo=cypress&logoColor=fff&style=for-the-badge" alt="cypress badge">
  <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=for-the-badge" alt="figma badge">
  <img src="https://img.shields.io/badge/Lighthouse-F44B21?logo=lighthouse&logoColor=fff&style=for-the-badge" alt="lighthouse badge">
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=for-the-badge" alt="github actions badge">
  <img src="https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=fff&style=for-the-badge" alt="postman badge">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=fff&style=for-the-badge" alt="netlify badge">
  <!--
  <img src="https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=fff&style=for-the-badge" alt="socket.io badge">
   other badges -->
</div>

## Installation Instructions
Note: the front-end and back-end are both deployed, so installation is not needed to use the web app. FE installation is required to run tests.

### FE Installation Instructions:
- Run the following on command line to clone the repo and run the app locally:
    ```
    git clone git@github.com:Brain-Defrost/Brain-Defrost_FE.git
    cd Brain-Defrost_FE
    npm install
    npm start
    ```

### BE Installation Instructions:
- Link to [Brain Defrost BE repo](https://github.com/Brain-Defrost/Brain-Defrost_BE)
- Deployed API link `https://brain-defrost-f8afea5ead0a.herokuapp.com`
- See setup instructions [here](https://github.com/Brain-Defrost/Brain-Defrost_BE#instructions)

### Run Tests:
- Ensure you're running the app locally (see FE Installation Instructions above)
- Run the following on command line to open Cypress: `npm run cypress`
- Click `E2E Testing`, then `Start E2E Testing` in desired browser
- Select `App_spec` to run user story tests
- Select `GamePlay_spec` to run game play test
- Select `Error_spec` to run error handling tests

## Context:
<!-- wins, challenges, about 20 hours spent, goals, approaches etc -->
This project was completed over 2 one-week sprints (*about 35 hours*). The team comprised 2 frontend developers and 3 backend developers as a Capstone Project for the final inning of Turing School of Software and Design bootcamp. [Part 1](https://github.com/Brain-Defrost/Brain-Defrost_FE/blob/main/.github/Brain%20Defrost%20Demo.gif) of the project was planning and completing our app's minimum viable product (MVP). Part 2 focused on refinement and adding additional features like
- Full connection to BE
- Background job for stats emails
- Enhanced UI with elements like modals, responsive design, and loading displays
- Multiplayer capability


### Goals

<details close>
  
  ```
  - Use scrum methodology to collaborate as a full stack team and provide production-ready software
  - Explore new concepts, libraries, or patterns
  - Practice professional git workflow
  - Build application that executes in development, test, CI, and production enfironments
  
  ```
  
</details>
  
### Wins
  
<details close>
  
  ```
  - CI/CD pipeline implementation
  - Postman mock server used for network requests during development
  - Multiplayer gameplay capability
  
  ```
  
</details>
  
### Challenges
  
<details close>
  
  ```
  - Testing gameplay and different user perspectives(game creator vs joining player) efficiently but thoroughly
  - Developing features for players to join game from a different browing session/window/device - problem approached by using encoded data stored in URL
  - Single-page application routing incompatability with GitHub Pages - problem approached by using a rerouting script in the `index.html` file
  - Having game data update in real time across all participating clients
  
  ```
  
</details>

### Upcoming Features
  
<details close>
  
  ```
  - Light & Dark mode display settings
  - Single-player vs Multi-player modes
  - `Surprise Me` button that will generate a trivia game with a surprise category
  
  ```
  
</details>


## Design Comp
<div align="center">
  <img src=".github/Brain Defrost Comp.png" alt="design composition">
</div>

### <p align="center">Contributors</p>
**BE Team**
  - Martin Chavez - [Github](https://github.com/Chavezgm) | [LinkedIn](https://www.linkedin.com/in/martin-chavez-garcia/)
  - Jess Kohl - [Github](https://github.com/kohljd) | [LinkedIn](https://www.linkedin.com/in/jessica-kohl-545785113/)
  - Laura Vega - [Github](https://github.com/laurarvegav) | [LinkedIn](https://www.linkedin.com/in/laurarvegav/)
  
**FE Team**
  - Ethan Duvall - [Github](https://github.com/EthanDuvall) | [LinkedIn](https://www.linkedin.com/in/eaduvall/)
  - Tayla Phillips - [Github](https://github.com/tednaphil) | [LinkedIn](https://www.linkedin.com/in/taylarichardsphillips/)
