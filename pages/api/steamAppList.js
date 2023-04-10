import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Steam app list: ", error);
    res.status(500).json({ error: "Failed to fetch Steam app list" });
  }
}
