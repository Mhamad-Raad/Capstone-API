/* eslint-disable no-console, camelcase */
const reservations = () => {
  const getData = async (idGame) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a7b39c66e2msh955dc94420a4cf6p1f79f5jsn778aaf9144a8',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };

    const data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`, options)
      .then((response) => response.json()).then((data) => data);
    return data;
  };

  const reserveSection = document.querySelector('.reserveSection');

  const closeReserve = (reserveSection) => {
    const closeBtn = document.querySelector('.comment_close');

    closeBtn.addEventListener('click', () => {
      reserveSection.className = 'popReserve';
    });
  };

  function addReservation(userName, startDate, endDate, itemId, newRes) {
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pLdIyUuZk5KvQvEUadM7/reservations/';
    if (userName !== '' && startDate !== '' && endDate !== '' && itemId !== '') {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          item_id: itemId.toString(),
          username: userName,
          date_start: startDate,
          date_end: endDate,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((reply) => reply.text()).then((val) => val);
      newRes.innerHTML += `<li class="eachComment">
      <p class="indi-comment">${userName}</p>
      <p class="indi-comment">${startDate}</p>
      <p class="indi-comment">${endDate}</p>
    </li>`;
    } else {
      alert('Please fill in all fields');
    }
  }

  const resPop = (arg, reservationList, reservationTitle) => {
    const reservationFigure = arg.length === undefined ? 0 : arg.length;
    reservationList.innerHTML = '';
    reservationTitle.innerHTML = '';
    reservationTitle.innerHTML = `<p>Reservations (${reservationFigure})</p>`;
    for (let i = 0; i < arg.length; i += 1) {
      reservationList.innerHTML += `<li class="eachComment">
                                  <p class="indi-comment">${arg[i].username}</p>
                                  <p class="indi-comment">${arg[i].date_start}</p>
                                  <p class="indi-comment">${arg[i].date_end}</p>
                                 </li>`;
    }
  };

  const getReservations = async (ID, reservationList, reservationTitle) => {
    const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pLdIyUuZk5KvQvEUadM7/reservations?item_id=${ID}`; // eslint-disable-line
    const recieve = await fetch(url).then((reply) => reply.json()).then((val) => val);
    const data = await recieve;
    resPop(data, reservationList, reservationTitle);
    return data;
  };
  const reservationsBtn = document.querySelectorAll('.card_btn');

  reservationsBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idGame = btn.id;
      const gameDataFns = await getData(idGame);

      const {
        title,
        screenshots: { 0: { image } },
        genre,
        platform,
        publisher,
        release_date, // eslint-disable-line
      } = gameDataFns;

      reserveSection.className = 'popReserve open';
      reserveSection.innerHTML = `
      <div class="comment">
        <div class="comment_close"><img src="./images/exit.svg" alt="close"></div>
        <div class="comment__top">
        <div class="comment__name">${title}</div>
        </div>
        <div class="data_desc">
          <div class="comment__img"><img src="${image}" alt="${gameDataFns.title}"></div>
          <ul class="comment_list">
            <li class="comment_li"><span class="comment_type">genre:</span>${genre}</li>
            <li class="comment_li"><span class="comment_type">platform:</span>${platform}</li>
            <li class="comment_li"><span class="comment_type">publisher:</span>${publisher}</li>
            <li class="comment_li"><span class="comment_type">release_date:</span>${release_date}</li> 
          </ul>
        </div>
        <div class="form__reserve">
          <form class="form__group">
          <h3 class="reserve__h3">Add a reservation</h3>
          <input type="text" class="form__input i1" placeholder="Your name">
          <input type="date" class="form__input i2" placeholder="Start Date">
          <input type="date" class="form__input i3"  placeholder="Finish Date">
          <button type="button" class="reserve_btn">Reserve</button>
          </form>
          <div class="reserve__msg">
            <h3 class="reserve__h3"></h3>
          </div>
        </div>
        </div>

      </div>`;
      const reservationList = document.querySelector('.reserve__msg');
      const reservationTitle = document.querySelector('.reserve__h3');
      getReservations(idGame, reservationList, reservationTitle);
      closeReserve(reserveSection);
      document.querySelector('.reserve_btn').addEventListener('click', (e) => {
        e.preventDefault();
        const userName = document.querySelector('.i1').value;
        const startDate = document.querySelector('.i2').value;
        const endDate = document.querySelector('.i3').value;
        const itemId = idGame;
        addReservation(userName, startDate, endDate, itemId, reservationList);
        document.querySelector('.i1').value = '';
        document.querySelector('.i2').value = '';
        document.querySelector('.i3').value = '';
      });
    });
  });
};

export default reservations;
