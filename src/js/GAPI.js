const fetch = require('node-fetch');

class API {
  constructor() {
    this.url = 'https://www.freetogame.com/api/games';
  }

    getGames = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e3e649ce61msh9d179687ba85493p1ac9f7jsn9f5dd7ec603d',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        },
      };

      const result = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
        .then((response) => response.json());
      return result;
    }

    getLikes = async () => {
      const result = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/p2MnFuwfM9jXcpbQ4fra/likes')
        .then((response) => response)
      return result;
    }

    getComments = async (item) => {
      const result = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/p2MnFuwfM9jXcpbQ4fra/comments?item_id=${item.id}`)
        .then((response) => response)
      return result;
    }
}

export default API;
