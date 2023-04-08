import axios from "axios";

export default async function getTwitchAccessToken() {
  console.log("test");
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  console.log(clientId, clientSecret);
  const response = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  );

  return response.data.access_token;
}
