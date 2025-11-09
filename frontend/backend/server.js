// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let highscore = 0;

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.post("/update-highscore", (req, res) => {
  const { score } = req.body;
  if (score > highscore) highscore = score;
  res.json({ highscore });
});

app.get("/highscore", (req, res) => {
  res.json({ highscore });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
