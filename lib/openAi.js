import axios from "axios";
const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
});

export async function analyzeReviews(reviews) {
  try {
    const prompt = `Given the following reviews, determine the most important soft features of the game:

${reviews.join("\n")}

Soft features:`;

    const response = await openai.post("", {
      prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const softFeatures = response.data.choices[0].text
      .split(",")
      .map((feature) => feature.trim());

    return softFeatures;
  } catch (error) {
    console.error("Error analyzing game attributes: ", error);
    return [];
  }
}

export default openai;
