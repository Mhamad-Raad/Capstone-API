import '../style.css';
import API from './GAPI.js';
import addLikesfunc from './addLikes.js';
import { commentPopup } from './showComments.js';

const gamesDiv = document.querySelector('.games');
const gameHeader = document.querySelector('.games_header');
const api = new API();

function addLikeBtnListener(games) {
  const loader = document.querySelector('#loader');
  loader.style.display = 'none';
  const likeBtns = document.querySelectorAll('.like_btn');
  likeBtns.forEach((btn, i) => {
    btn.remove();
    const gameCard = document.querySelectorAll('.game_card')[i];
    const newBtn = document.createElement('button');
    newBtn.classList.add('like_btn');
    newBtn.dataset.id = games[i].id;
    newBtn.innerHTML = `Likes (${games[i].likes})`;
    document.querySelectorAll('.btn-loader')[i].style.display = 'none';

    gameCard.insertBefore(newBtn, gameCard.childNodes[5]);

    newBtn.addEventListener('click', async (e) => {
      newBtn.remove();
      btn.remove();

      document.querySelectorAll('.btn-loader')[i].style.display = 'inline';
      const { id } = e.target.dataset;
      let temp = 0;
      const game = games.filter((game) => {
        if (parseInt(game.id, 10) === parseInt(id, 10)) {
          temp = game.id;
          return true;
        }
        return false;
      });
      games = games.map((key) => {
        if (key.id === temp) {
          key =  addLikesfunc(key);
        }
        return key;
      });
      await api.addLikes(game[0]);
      const gameCard = document.querySelectorAll('.game_card')[i];

      const newerBtn = document.createElement('button');
      newerBtn.classList.add('like_btn');
      newerBtn.dataset.id = id;
      newerBtn.innerHTML = `Likes (${game[0].likes})`;
      document.querySelectorAll('.btn-loader')[i].style.display = 'none';
      gameCard.insertBefore(newerBtn, gameCard.childNodes[5]);
      setTimeout(addLikeBtnListener, 500, games);
      gameCard.insertBefore(newerBtn, gameCard.childNodes[5]);
    });
  });
}

const render = async () => {
  gamesDiv.innerHTML = '';
  let games = await api.getGames();
  games = games.slice(0, 6);
  gameHeader.innerHTML = ` <button class="games_btn">Games(${games.length})</button>`;

  games.forEach(async (game) => {
    game.likes = await api.getLikes(game);
    gamesDiv.innerHTML += `
    <div class="game_card">
        <div class="card__img"><img src="${game.thumbnail}"></div>
       
          <h2 class="card_title">${game.title}</h2>
            <div class="btn-loader"></div>
            <button class="like_btn" data-id="${game.id}">Likes (${game.likes})</button>
          

        <p class="card__p">${game.short_description}</p>
        
        <div class="card_btns">
          <button class="commentBtn">Comments</button>
          <button class="card_btn">Reservations</button>
        </div>
      </div>
      `;
    const commentButtons = document.querySelectorAll('.commentBtn');
    commentPopup(games, commentButtons);
  });
  setTimeout(addLikeBtnListener, 3000, games);
};
window.load = render();

// window.addEventListener('DOMContentLoaded', addLikeBtnListener);
