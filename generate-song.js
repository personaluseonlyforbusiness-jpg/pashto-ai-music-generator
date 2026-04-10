import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { lyrics, style } = req.body;

    const replicate = new Replicate({
      auth: process.env.sk-188bca1311224d7b8466a08b2c41985e,
    });

    const prompt = `Pashto traditional song. Style: ${style}. Lyrics: ${lyrics}`;

    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e5525c8f8d8a3e0f12640add3521dc1a50637e2b2fc90d92c8c0f",
      {
        input: {
          prompt: prompt,
          duration: 20
        }
      }
    );

    res.status(200).json({ audio: output });

  } catch (error) {
    res.status(500).json({ error: "Music generation failed" });
  }
}
