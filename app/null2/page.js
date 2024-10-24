"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "@fontsource/nunito";
const questions = [
  { question: "Have you been feeling stressed recently?", score: 20 },
  { question: "Have you experienced significant weight changes?", score: 15 },
  { question: "Have you noticed any changes in your appetite?", score: 10 },
  { question: "Have you been avoiding meals or skipping food?", score: 15 },
  {
    question: "Have you been preoccupied with thoughts about food and weight?",
    score: 10,
  },
  {
    question: "Have you felt anxious or fearful about gaining weight?",
    score: 5,
  },
  { question: "Have you engaged in binge eating episodes?", score: 20 },
  {
    question: "Have you used purging methods, such as vomiting or laxatives?",
    score: 20,
  },
  { question: "Have you felt a lack of control over your eating?", score: 15 },
  { question: "Have you experienced any gastrointestinal issues?", score: 15 },
  { question: "Have you had irregular menstrual cycles?", score: 10 },
  { question: "Have you been feeling more fatigued than usual?", score: 10 },
  { question: "Have you noticed changes in your hair or skin?", score: 15 },
  {
    question:
      "Have you been withdrawing from social activities involving food?",
    score: 10,
  },
  { question: "Have you felt guilty or ashamed after eating?", score: 5 },
  { question: "Have you been excessively exercising?", score: 10 },
  { question: "Have you felt disconnected from your body?", score: 10 },
  { question: "Have you engaged in secretive eating behaviors?", score: 20 },
  {
    question: "Have you found yourself comparing your body to others?",
    score: 10,
  },
  { question: "Have you been experiencing mood swings?", score: 10 },
  { question: "Have you had trouble sleeping or insomnia?", score: 10 },
  { question: "Have you felt cold more often than usual?", score: 5 },
  { question: "Have you made excuses to avoid eating with others?", score: 10 },
  { question: "Have you experienced a decrease in self-esteem?", score: 10 },
  {
    question: "Have you been feeling overwhelmed by food-related decisions?",
    score: 5,
  },
  {
    question: "Have you found yourself obsessively counting calories?",
    score: 10,
  },
  {
    question: "Have you felt discomfort in social situations related to food?",
    score: 10,
  },
  {
    question: "Have you noticed any physical changes like brittle nails?",
    score: 5,
  },
  {
    question: "Have you been using food to cope with stress or emotions?",
    score: 10,
  },
  {
    question: "Have you experienced feelings of emptiness or loneliness?",
    score: 5,
  },
  {
    question:
      "Have you had thoughts of self-harm related to your eating habits?",
    score: 5,
  },
  { question: "Have you felt your worth tied to your appearance?", score: 10 },
  { question: "Have you avoided mirrors or reflective surfaces?", score: 5 },
  { question: "Have you been hoarding or hiding food?", score: 10 },
  {
    question: "Have you experienced increased sensitivity to criticism?",
    score: 15,
  },
  { question: "Have you been feeling dizzy or lightheaded often?", score: 15 },
  {
    question: "Have you lost interest in hobbies you once enjoyed?",
    score: 10,
  },
  {
    question: "Have you felt an intense need for perfectionism in your diet?",
    score: 15,
  },
  { question: "Have you found it hard to concentrate lately?", score: 10 },
  {
    question:
      "Have you felt the urge to fast or severely restrict your eating?",
    score: 20,
  },
  {
    question: "Have you engaged in food rituals or strict routines?",
    score: 15,
  },
  {
    question: "Have you had frequent headaches or physical discomfort?",
    score: 10,
  },
  {
    question:
      "Have you experienced a change in friendships due to your eating habits?",
    score: 10,
  },
  {
    question: "Have you felt the need to justify your eating choices?",
    score: 10,
  },
  {
    question: "Have you experienced any digestive issues, like constipation?",
    score: 15,
  },
  {
    question: "Have you felt a sense of dread or anxiety about meal times?",
    score: 20,
  },
  {
    question: "Have you been using diet pills or other substances?",
    score: 25,
  },
  {
    question: "Have you felt like you're losing touch with reality?",
    score: 10,
  },
  { question: "Have you felt angry or frustrated about your body?", score: 15 },
  {
    question: "Have you been feeling overwhelmed by your emotions?",
    score: 10,
  },
];

const Quiz2 = () => {
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
    Cookies.set("eatingPercentage", percentageWithinRange);
    console.log(percentageWithinRange + "eatingPercentage");
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
        paddingLeft: "20px",
        paddingRight: "20px",
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

export default Quiz2;
