import axios from "axios";
export async function getSteamId(gameName) {
  try {
    const { data } = await axios.get("/api/steamSearch", {
      params: {
        gameName,
      },
    });
    console.log(data);

    const matchedGame = data.apps.find(
      (item) => item.name.toLowerCase() === gameName.toLowerCase()
    );
    return matchedGame ? matchedGame.appid : null;
  } catch (error) {
    console.error("Error fetching Steam ID: ", error);
    return null;
  }
}
export async function getReviews(
  steamId,
  language = "all",
  reviewType = "all",
  purchaseType = "steam",
  numPerPage = 20
) {
  try {
    console.log("Fetching reviews for game with Steam ID: ", steamId);
    const { data: reviewData } = await axios.get("/api/steamReviews", {
      params: {
        steamId,
        language,
        reviewType,
        purchaseType,
        numPerPage,
      },
    });
    return reviewData.reviews;
    // ... (Rest of the code remains the same)
  } catch (error) {
    console.error("Error fetching game reviews: ", error);
    return [];
  }
}
