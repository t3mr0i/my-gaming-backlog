import axios from "axios";

export default async function handler(gameTitle) {
  const searchTerm = encodeURIComponent(gameTitle);
  const apiKey = "2f3712f6cf424046b04b31f179fe79e0";
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`
  );
  const games = response.data.results.map((game) => ({
    id: game.id,
    name: game.name,
    length: game.playtime,
    metacritic: game.metacritic,
    cover: game.background_image,
    slug: game.slug,
  }));
  return games;
}
