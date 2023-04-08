import axios from "axios";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci-codex/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

const analyzeGameAttributes = async (tags, reviews) => {
  const prompt = `Analyze the following game tags and user reviews to describe the game in terms of its soft features (e.g. tense, scary, funny, difficult, etc.)\n\nTags:\n${tags.join(
    "\n"
  )}\n\nUser Reviews:\n${reviews.join("\n")}\n\nSoft Features: `;

  try {
    const { data } = await openai.post("", { prompt, max_tokens: 100 });
    return data.choices[0].text.trim();
  } catch (error) {
    console.error("Error analyzing game attributes: ", error);
    return "";
  }
