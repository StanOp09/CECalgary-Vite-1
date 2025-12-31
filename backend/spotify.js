import express from "express";
import fetch from "node-fetch"; // npm i node-fetch
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SHOW_ID = "50iUP4PO89LSNF3LGphNL3"; // Your church show ID

// Get Spotify access token
async function getToken() {
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
          "base64"
        ),
    },
    body: "grant_type=client_credentials",
  });
  const data = await resp.json();
  return data.access_token;
}

// Route to get latest 6 episodes
router.get("/latest-sermons", async (req, res) => {
  try {
    const token = await getToken();
    const resp = await fetch(
      `https://api.spotify.com/v1/shows/${SHOW_ID}/episodes?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    // send only necessary fields
    const episodes = data.items.map((ep) => ({
      name: ep.name,
      description: ep.description,
      release_date: ep.release_date,
      audio_url: ep.external_urls.spotify,
      embed_url: `https://open.spotify.com/embed/episode/${ep.id}`,
    }));
    res.json(episodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Spotify API error" });
  }
});

export default router;
