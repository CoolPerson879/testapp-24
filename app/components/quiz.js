"use client"
import { useState, useEffect } from 'react';

const questions = [
  // Example data - replace this with your actual dataset
  { question: "What is the capital of France?", score: 10 },
  { question: "What is 2 + 2?", score: 5 },
  { question: "Who wrote 'Hamlet'?", score: 7 },
  { question: "What is the largest planet?", score: 15 },
  { question: "What year did WW2 end?", score: 20 },
];

const Home = () => {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [selectedMultipliers, setSelectedMultipliers] = useState({});

  // Fetch random questions when the page loads
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 5); // Change 5 to 25 for more questions
    setRandomQuestions(selectedQuestions);
  }, []);

  const handleCirclePress = (questionIndex, circleIndex) => {
    setSelectedMultipliers(prev => ({
      ...prev,
      [questionIndex]: circleIndex + 1, // 1x to 5x (0-indexed, so add 1)
    }));
  };

  const calculateTotalScore = () => {
    let totalScoreWithMultipliers = 0;
    let totalScoreWithoutMultipliers = 0;

    randomQuestions.forEach((question, index) => {
      const multiplier = selectedMultipliers[index] || 1;
      totalScoreWithMultipliers += question.score * multiplier;
      totalScoreWithoutMultipliers += question.score;
    });

    alert(`Total Score (With Multipliers): ${totalScoreWithMultipliers}\nTotal Score (Without Multipliers): ${totalScoreWithoutMultipliers}`);
  };

  const circleColors = [
    '#5fa2e0',  // Light blue
    '#0074D9',  // Darker blue
    '#A9A9A9',  // Gray (middle)
    '#9370DB',  // Light purple
    '#4B0082',  // Dark purple
  ];

  const circleSizes = [60, 50, 40, 50, 60];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Multiplier Labels */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5].map((multiplier, index) => (
          <div key={index} style={{ margin: '0 15px', fontWeight: 'bold' }}>{multiplier}x</div>
        ))}
      </div>

      <div>
        {randomQuestions.map((item, questionIndex) => (
          <div key={questionIndex} style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h3>{item.question}</h3>
            <p>Score: {item.score}</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              {[0, 1, 2, 3, 4].map((circleIndex) => {
                const isSelected = selectedMultipliers[questionIndex] === circleIndex + 1;
                return (
                  <div
                    key={circleIndex}
                    onClick={() => handleCirclePress(questionIndex, circleIndex)}
                    style={{
                      width: circleSizes[circleIndex],
                      height: circleSizes[circleIndex],
                      borderRadius: '50%',
                      border: `2px solid ${circleColors[circleIndex]}`,
                      backgroundColor: isSelected ? circleColors[circleIndex] : 'transparent',
                      margin: '0 10px',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={calculateTotalScore}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
