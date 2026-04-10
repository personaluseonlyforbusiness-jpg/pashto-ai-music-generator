document.getElementById("generateBtn").addEventListener("click", async function() {
  const lyrics = document.getElementById("lyrics").value;
  const title = document.getElementById("title").value;
  const style = document.getElementById("style").value;

  // Send request to backend
  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lyrics, style })
  });

  const result = await response.json();

  // Clear old output
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  // Create audio player
  const audio = document.createElement("audio");
  audio.controls = true;

  // CASE 1: If Hugging Face returns base64 audio
  if (result.audio) {
    audio.src = "data:audio/wav;base64," + result.audio;
  }

  // CASE 2: If Hugging Face returns a URL
  else if (result.url) {
    audio.src = result.url;
  }

  // Add audio player to page
  outputDiv.appendChild(audio);
});
