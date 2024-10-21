"use client";
// components/Quiz.js
import { useState, useEffect } from "react";
import questions from "../data/questions.json";

const Quiz = () => {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [selectedMultipliers, setSelectedMultipliers] = useState({});

  // Get random questions function
  const getRandomQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 25);
    setRandomQuestions(selectedQuestions);
    setSelectedMultipliers({});
  };

  useEffect(() => {
    getRandomQuestions(); // Initial load of random questions
  }, []);

  // Handle circle press event
  const handleCirclePress = (questionIndex, circleIndex) => {
    setSelectedMultipliers((prev) => ({
      ...prev,
      [questionIndex]: circleIndex + 1,
    }));
  };

  // Calculate total score
  const calculateTotalScore = () => {
    let totalScoreWithMultipliers = 0;
    let totalScoreWithoutMultipliers = 0;
    let maximumScore = 0;

    randomQuestions.forEach((question, index) => {
      const multiplier = selectedMultipliers[index] || 1;
      totalScoreWithMultipliers += question.score * multiplier;
      totalScoreWithoutMultipliers += question.score;
      maximumScore = totalScoreWithoutMultipliers * 5;
    });

    alert(
      `Scores\nTotal Score (With Multipliers): ${totalScoreWithMultipliers}\nPercentage in between: ${Math.round(
        ((totalScoreWithMultipliers - totalScoreWithoutMultipliers) /
          (maximumScore - totalScoreWithoutMultipliers)) *
          100
      )}%\nTotal Score (Without Multipliers): ${totalScoreWithoutMultipliers}`
    );
  };

  const circleColors = [
    "#14bdff",
    "#a4dfff",
    "#A9A9A9",
    "#d6b2f6",
    "#be82ed",
  ];

  return (
    <div className="quiz-container">
      <div className="multiplier-header">
        {[1, 2, 3, 4, 5].map((multiplier) => (
          <span key={multiplier} className="multiplier">
            {multiplier}x
          </span>
        ))}
      </div>

      <div className="questions">
        {randomQuestions.map((item, questionIndex) => (
          <div key={questionIndex} className="question-item">
            <h2>{item.question}</h2>
            <p>Score: {item.score}</p>
            <div className="circle-row">
              {[0, 1, 2, 3, 4].map((circleIndex) => {
                const isSelected = selectedMultipliers[questionIndex] === circleIndex + 1;
                const circleSizes = [60, 50, 40, 50, 60];
                return (
                  <button
                    key={circleIndex}
                    onClick={() => handleCirclePress(questionIndex, circleIndex)}
                    className={`circle ${isSelected ? 'selected' : ''}`}
                    style={{
                      width: circleSizes[circleIndex],
                      height: circleSizes[circleIndex],
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <button onClick={calculateTotalScore} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
