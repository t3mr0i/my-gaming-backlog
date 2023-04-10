// /pages/api/analyzeGameAttributes.js
import axios from "axios";

const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci-codex/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
});

export default async function handler(req, res) {
  const { tags, reviews } = req.body;
  console.log(tags, reviews);
  const prompt = `Analyze the following game tags and user reviews to describe the game in terms of its soft features (e.g. tense, scary, funny, difficult, etc.)\n\nTags:\n${tags.join(
    "\n"
  )}\n\nUser Reviews:\n${reviews.join("\n")}\n\nSoft Features: `;

  try {
    const { data } = await openai.post("", { prompt, max_tokens: 100 });
    console.log(data);
    res.status(200).json({ softFeatures: data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error analyzing game attributes: ", error);
    res.status(500).json({ error: "Error analyzing game attributes" });
  }
}
