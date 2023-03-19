import axios from "axios";

export default async function handler(req, res) {
  const searchTerm = encodeURIComponent(req.query.term);
  const apiKey = "2f3712f6cf424046b04b31f179fe79e0";
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`
  );
  const games = response.data.results.map((game) => ({
    id: game.id,
    name: game.name,
    length: game.playtime,
    cover: game.background_image, // Include the cover image
    slug: game.slug, // Include the game slug for fetching recommendations
  }));
  console.log(games);
  res.status(200).json(games);
}
