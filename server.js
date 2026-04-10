const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { lyrics, style } = req.body;

  // Example: call Hugging Face API
  const response = await fetch("https://api-inference.huggingface.co/models/your-music-model", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: `${style} song with lyrics: ${lyrics}` })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
