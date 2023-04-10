// /pages/api/steamSearch.js
import axios from "axios";

const STEAM_API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;

export default async function handler(req, res) {
  const { gameName } = req.query;

  try {
    const { data: appListData } = await axios.get(
      `https://api.steampowered.com/ISteamApps/GetAppList/v2?key=${STEAM_API_KEY}`
    );

    const filteredApps = appListData.applist.apps.filter((app) =>
      app.name.toLowerCase().includes(gameName.toLowerCase())
    );

    res.status(200).json({ success: true, apps: filteredApps });
  } catch (error) {
    console.error("Error searching for Steam game: ", error);
    res.status(500).json({ error: "Error searching for Steam game" });
  }
}
