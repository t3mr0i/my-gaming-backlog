import axios from "axios";
import getTwitchAccessToken from "../../../lib/getTwitchAccessToken";

export default async function handler(req, res) {
  const searchTerm = req.query.searchTerm;
  const accessToken = jxa481kexenqzn0a2q8wpaz4h7n2wk;
  console.log(accessToken);
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `search "${searchTerm}"; fields id, name, cover.url, platforms.name, genres.name, first_release_date, total_rating; limit 10;`,
      {
        headers: {
          "Client-ID": "process.env.TWITCH_CLIENT_ID",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const games = response.data.map((game) => ({
      id: game.id,
      name: game.name,
      cover: game.cover ? game.cover.url.replace("t_thumb", "t_cover_big") : "",
      platforms: game.platforms
        ? game.platforms.map((platform) => platform.name)
        : [],
      genres: game.genres ? game.genres.map((genre) => genre.name) : [],
      releaseDate: game.first_release_date
        ? new Date(game.first_release_date * 1000).toISOString()
        : "",
      totalRating: game.total_rating || 0,
    }));

    res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching games" });
  }
}
