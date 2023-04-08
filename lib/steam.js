import axios from "axios";

const getSteamId = async (gameName) => {
  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const searchUrl = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
  const { data } = await axios.get(searchUrl);

  const game = data.applist.apps.find(
    (app) => app.name.toLowerCase() === gameName.toLowerCase()
  );

  return game ? game.appid : null;
};

const getTagsAndReviews = async (steamId) => {
  const apiKey = process.env.NEXT_PUBLIC_STEAM_API_KEY;
  const appDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${steamId}`;

  try {
    const { data } = await axios.get(appDetailsUrl);
    const tags = Object.keys(data[steamId].data.categories).map(
      (tag) => data[steamId].data.categories[tag].description
    );

    const reviewsUrl = `https://store.steampowered.com/appreviews/${steamId}?json=1&language=all&num_per_page=5&filter=updated&review_type=all&purchase_type=all&playtime_filter_enabled=0`;

    const { data: reviewsData } = await axios.get(reviewsUrl);
    const reviews = reviewsData.reviews.map((review) => review.review);

    return { tags, reviews };
  } catch (error) {
    console.error("Error fetching tags and reviews: ", error);
    return { tags: [], reviews: [] };
  }
};

export { getSteamId, getTagsAndReviews };
