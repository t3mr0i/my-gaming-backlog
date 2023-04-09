import axios from "axios";

export default async function handler(req, res) {
  const { endpoint, ...params } = req.query;
  const url = `https://api.steampowered.com/${endpoint}`;
  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const config = {
    params: {
      ...params,
      key: apiKey,
    },
  };

  try {
    const { data } = await axios.get(url, config);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Steam API: ", error.response.data);
    res.status(500).json({ message: "Error fetching data from Steam API" });
  }
}
