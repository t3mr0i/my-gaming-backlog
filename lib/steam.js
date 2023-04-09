import axios from "axios";

const steamApi = axios.create({
  baseURL: "https://store.steampowered.com/appreviews/",
});

const fetchUserReviews = async (appId, params) => {
  try {
    const { data } = await steamApi.get(`${appId}?json=1`, { params });
    return data;
  } catch (error) {
    console.error("Error fetching user reviews: ", error);
    return {};
  }
};

const getSteamId = async (gameName) => {
  if (typeof gameName !== "string" || gameName.length === 0) {
    console.error("Invalid game name:", gameName);
    return null;
  }

  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const searchUrl = `/api/steam?endpoint=ISteamApps/GetAppList/v2`;
  const { data } = await axios.get(searchUrl);
  const game = data.applist.apps.find(
    (app) => app.name.toLowerCase() === gameName.toLowerCase()
  );

  return game ? game.appid : null;
};

const getTagsAndReviews = async (steamId) => {
  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const appDetailsUrl = `/api/steam?endpoint=store.steampowered.com/api/appdetails&appids=${steamId}`;
  try {
    const { data } = await axios.get(appDetailsUrl);
    const tags = Object.keys(data[steamId].data.categories).map(
      (tag) => data[steamId].data.categories[tag].description
    );

    const params = {
      language: "all",
      num_per_page: 5,
      filter: "updated",
      review_type: "all",
      purchase_type: "all",
      playtime_filter_enabled: 0,
    };

    const reviewsData = await fetchUserReviews(steamId, params);
    const reviews = reviewsData.reviews.map((review) => review.review);

    return { tags, reviews };
  } catch (error) {
    console.error("Error fetching tags and reviews: ", error);
    return { tags: [], reviews: [] };
  }
};

export { getSteamId, getTagsAndReviews };
