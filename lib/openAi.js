import axios from "axios";
const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/text-davinci-003/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
});

export async function analyzeReviews(reviews) {
  console.log(reviews.review);
  try {
    const prompt = `Please suggest a list of relevant tags for this game based on its Steam reviews, I want to find out its soft features (e.g. tense, scary, funny, difficult, etc.):

    ${reviews.review}
    
    Tags:`;

    const response = await openai.post("", {
      prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.9,
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
