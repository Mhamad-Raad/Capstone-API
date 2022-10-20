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
        .then((response) => response.json()).then((result) => result);
      return result;
    }

    getLikes = async (item) => {
      let result = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/p2MnFuwfM9jXcpbQ4fra/likes')
        .then((response) => response).then((result) => result.json());
      result = result.filter((a) => a.item_id === item.id);
      if (result.length === 0) {
        return 0;
      }
      return result[0].likes;
    }

    addLikes = async (item) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: item.id,
        }),
      };

      const result = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/p2MnFuwfM9jXcpbQ4fra/likes', options)
        .then((response) => response);

      return result;
    }
}

module.exports = API;
