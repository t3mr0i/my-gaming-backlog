import axios from "axios";

export default async function handler(req, res) {
  const gameSlug = req.query.slug;
  console.log(gameSlug);
  const apiKey = process.env.RAWG_API_KEY;
  const response = await axios.get(
    `https://api.rawg.io/api/games/${gameSlug}/suggested?key=${apiKey}`
  );

  const games = response.data.results.map((game) => ({
    id: game.id,
    name: game.name,
    length: game.playtime,
    cover: game.background_image,
  }));

  res.status(200).json(games);
}
