import axios from "axios";

const steamSearch = axios.create({
  baseURL: "https://store.steampowered.com/api",
});

export default async function handler(req, res) {
  const {
    steamId,
    language = "all",
    reviewType = "all",
    purchaseType = "steam",
    numPerPage = 20,
  } = req.query;

  try {
    const reviewsUrl = `https://store.steampowered.com/appreviews/${steamId}?json=1&language=${language}&review_type=${reviewType}&purchase_type=${purchaseType}&num_per_page=${numPerPage}`;

    const { data: reviewData } = await axios.get(reviewsUrl);
    console.log(reviewData);
    res.status(200).json(reviewData);
  } catch (error) {
    console.error("Error fetching Steam reviews: ", error);
    res.status(500).json({ error: "Failed to fetch Steam reviews" });
  }
}
