const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/leaderboard.json");

function readData() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

router.post("/match", (req, res) => {
  const { username, result } = req.body;
  let leaderboard = readData();

  let user = leaderboard.find((u) => u.username === username);
  if (!user) {
    user = { username, wins: 0, losses: 0, draws: 0, games: 0 };
    leaderboard.push(user);
  }

  if (result === "win") user.wins++;
  else if (result === "lose") user.losses++;
  else if (result === "draw") user.draws++;

  user.games++;
  writeData(leaderboard);
  res.status(200).json({ message: "Match result saved!" });
});

router.get("/leaderboard", (req, res) => {
  let leaderboard = readData();
  leaderboard.sort((a, b) => b.wins - a.wins || a.games - b.games);
  res.json(leaderboard.slice(0, 100));
});

module.exports = router;
