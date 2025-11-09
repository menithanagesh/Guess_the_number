// frontend/src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.trunc(Math.random() * 20) + 1);
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(0);
  const [message, setMessage] = useState("Start guessing...");
  const [guess, setGuess] = useState("");

  const displayMessage = (msg) => setMessage(msg);

  const checkGuess = async () => {
    const guessNum = Number(guess);
    if (!guessNum) {
      displayMessage("No number!!");
    } else if (guessNum === secretNumber) {
      displayMessage("Correct Number!");
      document.body.style.backgroundColor = "#60b347";

      // Update backend highscore
      try {
        const res = await fetch("http://localhost:5000/update-highscore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });
        const data = await res.json();
        setHighscore(data.highscore);
      } catch (err) {
        console.error("Could not update highscore", err);
      }
    } else if (guessNum > secretNumber) {
      if (score > 1) {
        displayMessage("Too high!");
        setScore(score - 1);
      } else {
        displayMessage("You lost the game!");
        setScore(0);
      }
    } else if (guessNum < secretNumber) {
      if (score > 1) {
        displayMessage("Too low!");
        setScore(score - 1);
      } else {
        displayMessage("You lost the game!");
        setScore(0);
      }
    }
  };

  const resetGame = () => {
    setScore(20);
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    setGuess("");
    setMessage("Start guessing...");
    document.body.style.backgroundColor = "#222";
  };

  return (
    <div>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={resetGame}>Again!</button>
        <div className="number">?</div>
      </header>

      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button className="btn check" onClick={checkGuess}>Check!</button>
        </section>

        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">💯 Score: <span className="score">{score}</span></p>
          <p className="label-highscore">🥇 Highscore: <span className="highscore">{highscore}</span></p>
        </section>
      </main>
    </div>
  );
}

export default App;