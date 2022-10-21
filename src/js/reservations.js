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
      .then((response) => response.json()).then((data) => {
        return data;
      });
    return data;
  };

  const reserveSection = document.querySelector('.reserveSection');

  const closeReserve = (reserveSection) => {
    const closeBtn = document.querySelector('.comment_close');

    closeBtn.addEventListener('click', () => {
      reserveSection.className = 'popReserve';
    });
  };

  function addReservation(userName, startDate, endDate, itemId) {

  }



  const reservationsBtn = document.querySelectorAll('.card_btn_res');

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
        release_date,
      } = gameDataFns;

      reserveSection.className = 'popReserve open';
      reserveSection.innerHTML = `
      <div class="comment">
        <div class="comment_close"><img src="./assets/images/exit.svg" alt="close"></div>
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
          <input type="text" class="form__input" placeholder="Your name">
          <input type="date" class="form__input" placeholder="Start Date">
          <input type="date" class="form__input" placeholder="Finish Date">
          <button class="form_btn">Reserve</button>
          </form>
          <div class="reserve__msg">

          </div>
        </div>
        </div>

      </div>`;
      closeReserve(reserveSection);
      // addreservation();
    });
  });
};

export default reservations;
