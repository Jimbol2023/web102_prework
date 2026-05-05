/*****************************************************************************
 * Challenge 2
*/

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4
*/

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    console.log("Unfunded:", unfundedGames.length);

    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    console.log("Funded:", fundedGames.length);

    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6
*/

const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});

const numUnfundedGames = unfundedGames.length;

const companyInfo = document.createElement("p");

companyInfo.innerHTML = `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? "" : "s"} remain unfunded. We need your help to fund these amazing games!`;

descriptionContainer.appendChild(companyInfo);

/************************************************************************************
 * Challenge 7
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame] = sortedGames;

const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameName);