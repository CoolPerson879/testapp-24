"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "@fontsource/nunito";
const questions = [
  {
    question: "How often do you drink the normal amount of water?",
    score: -10,
  },
  { question: "How often are you on your phone right before bed?", score: -5 },
  { question: "Have you had clear pee in the past 2 weeks?", score: -10 },
  { question: "Do you feel lightheaded frequently?", score: 15 },
  { question: "Have you had some heart palpitations lately?", score: 15 },
  { question: "Have you had stomach problems in the past week?", score: 5 },
  {
    question:
      "Have you been arguing with your family members more than often in the last month?",
    score: 15,
  },
  {
    question: "During school or work, have you felt like you can't sit still?",
    score: 30,
  },
  {
    question: "Do you usually eat dinner right before going to bed?",
    score: 10,
  },
  { question: "How often do you smoke?", score: 15 },
  { question: "Do you fidget often?", score: 20 },
  { question: "Do you drink caffeine before bed?", score: 15 },
  { question: "Do you usually have traumatic flashbacks?", score: 20 },
  {
    question: "Are you usually in a comfortable temperature for sleeping?",
    score: -10,
  },
  {
    question: "Do you sleep at the same time every night?",
    score: -10,
  },
  { question: "Are you generally indecisive?", score: 20 },
  {
    question:
      "Do you immediately take action rather than taking time thinking about decisions?",
    score: 25,
  },
  {
    question: "How often do you forget about dates or assignments?",
    score: 20,
  },
  { question: "How often do you tap on the ground with your feet?", score: 25 },
  { question: "Is your room messy?", score: 15 },
];

const Quiz3 = () => {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [selectedMultipliers, setSelectedMultipliers] = useState({});

  // Fetch random questions when the page loads
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 25); // Display 25 questions
    setRandomQuestions(selectedQuestions);
  }, []);

  const handleCirclePress = (questionIndex, circleIndex) => {
    setSelectedMultipliers((prev) => ({
      ...prev,
      [questionIndex]: circleIndex + 1, // 1x to 5x (0-indexed, so add 1)
    }));
  };

  const calculateTotalScore = () => {
    let totalScoreWithMultipliers = 0;
    let totalScoreWithoutMultipliers = 0;
    let upperbound = 0;
    let percentageWithinRange = 0;

    randomQuestions.forEach((question, index) => {
      const multiplier = selectedMultipliers[index] || 1;
      totalScoreWithMultipliers += question.score * multiplier;
      totalScoreWithoutMultipliers += question.score;
      upperbound += question.score * 5;
    });

    percentageWithinRange = Math.round(
      ((totalScoreWithMultipliers - totalScoreWithoutMultipliers) /
        (upperbound - totalScoreWithoutMultipliers)) *
        100
    );
    // Save scores in cookies
    Cookies.set("adhdPercentage", percentageWithinRange);
    console.log(percentageWithinRange + "adhdPercentage");
    window.location.href = "/results";

    // Without is lowerbound, with multipliers is score, upperbound is without * 5
    // Navigate to results page or show them in a new page
    // window.location.href = `/results?totalWithMultipliers=${totalScoreWithMultipliers}&totalWithoutMultipliers=${totalScoreWithoutMultipliers}`;
  };

  const circleColors = [
    "#0074D9", // Darker blue (left)
    "#5fa2e0", // Lighter blue
    "#A9A9A9", // Gray (middle)
    "#9370DB", // Light purple
    "#674e99", // Dark purple (right)
  ];

  const circleSizes = [60, 50, 40, 50, 60];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#fff", // White background for the whole screen
        minHeight: "100vh", // Ensure the height covers the whole viewport
        paddingTop: "20px", // Ensure the top is not cut off
        fontFamily: "Nunito", // Use Nunito font for the whole page
        paddingLeft: "20px", // Ensure the bottom is not cut off
        paddingRight: "20px", // Ensure the bottom is not cut off
      }}
    >
      <div
        style={{
          color: "#000", // Text color set to black
          padding: "20px",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Multiplier Labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {[
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree",
          ].map((multiplier, index) => (
            <div key={index} style={{ margin: "0 10px" }}>
              {multiplier}
            </div>
          ))}
        </div>

        <div>
          {randomQuestions.map((item, questionIndex) => (
            <div
              key={questionIndex}
              style={{
                marginBottom: "40px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3 style={{ color: "#000" }}>{item.question}</h3>{" "}
              {/* Text color black */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", // Vertically center the circles
                  marginTop: "10px",
                }}
              >
                {[0, 1, 2, 3, 4].map((circleIndex) => {
                  const isSelected =
                    selectedMultipliers[questionIndex] === circleIndex + 1;
                  return (
                    <div
                      key={circleIndex}
                      onClick={() =>
                        handleCirclePress(questionIndex, circleIndex)
                      }
                      style={{
                        width: circleSizes[circleIndex],
                        height: circleSizes[circleIndex],
                        borderRadius: "50%",
                        border: `2px solid ${circleColors[circleIndex]}`,
                        backgroundColor: isSelected
                          ? circleColors[circleIndex]
                          : "transparent",
                        margin: "0 10px",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={calculateTotalScore}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz3;
