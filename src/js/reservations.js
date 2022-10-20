
const reservations =  () =>{ 

const getData = async (idGame) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a7b39c66e2msh955dc94420a4cf6p1f79f5jsn778aaf9144a8',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`, options)
  .then((response) => response.json()).then((data) => {
    //console.log(data)
    return data;
  });
    return data;
  };

const reserve_section = document.querySelector('.reserve_section');

 const closeReserve = (reserve_section) => { 
  const closeBtn = document.querySelector('.comment_close');

  closeBtn.addEventListener('click', () => {
    reserve_section.className = 'popReserve';
  });
}

const reservationsBtn = document.querySelectorAll('.card_btn_res');
 
  reservationsBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idGame = btn.id;
      const gameDataFns = await getData(idGame);

      const { title, screenshots: { 0: { image } }, genre, platform, publisher, release_date} = gameDataFns;

      reserve_section.className = 'popReserve open'
      reserve_section.innerHTML = `
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
        <form class="form__reserve">
          <h3 class="reserve__h3">Add a reservation</h3>
          <input type="text" class="form__input" placeholder="Your name">
          <input type="date" class="form__input" placeholder="Start Date">
          <input type="date" class="form__input" placeholder="Finish Date">
          <button class="form_btn">Reserve</button>
        </form>
        </div>

      </div>`;
      //console.log(reserve_section);
      
      closeReserve(reserve_section);

    });
  })

}



export default reservations;
