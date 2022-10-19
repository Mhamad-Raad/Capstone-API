import '../style.css';
import API from './GAPI.js';

const gamesDiv = document.querySelector('.games');
const gameHeader = document.querySelector('.games_header');
const api = new API();

const render = async () => {
  const games = await api.getGames();

  gameHeader.innerHTML = ` <button class="games_btn">Games(${games.length})</button>`;
  games.forEach((game) => {
    gamesDiv.innerHTML += `
    <div class="game_card">
        <div class="card__img"><img src="${game.thumbnail}"></div>
        <h2 class="card_title">${game.title}</h2>
        <p class="card__p">${game.short_description}</p>
        <div class="card_btns">
          <button class="card_btn">Comments</button>
          <button class="card_btn">Reservations</button>
        </div>
      </div>
      `;
  });
};

render();
