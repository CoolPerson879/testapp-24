"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "@fontsource/nunito";
const questions = [
  {
    question: "Have you experienced difficulty in understanding social cues?",
    score: 30,
  },
  {
    question:
      "Have you found it challenging to make eye contact during conversations?",
    score: 30,
  },
  {
    question:
      "Have you ever felt overwhelmed in noisy or crowded environments?",
    score: 30,
  },
  {
    question:
      "Have you preferred to spend time alone rather than in social situations?",
    score: 25,
  },
  {
    question:
      "Have you noticed patterns in your interests or hobbies that you focus on intensely?",
    score: 25,
  },
  {
    question:
      "Have you struggled with changes in routine or unexpected events?",
    score: 30,
  },
  { question: "Have you often felt anxious in social settings?", score: 25 },
  {
    question:
      "Have you had difficulty understanding jokes or figurative language?",
    score: 25,
  },
  {
    question:
      "Have you experienced sensory sensitivities to lights, sounds, or textures?",
    score: 30,
  },
  {
    question: "Have you found it hard to initiate or maintain conversations?",
    score: 30,
  },
  {
    question: "Have you engaged in repetitive movements or behaviors?",
    score: 30,
  },
  {
    question:
      "Have you had trouble recognizing or expressing your own emotions?",
    score: 25,
  },
  {
    question:
      "Have you been told that you sometimes speak in a monotone voice?",
    score: 20,
  },
  {
    question: "Have you found it difficult to understand others' perspectives?",
    score: 25,
  },
  {
    question:
      "Have you preferred structured activities over unstructured ones?",
    score: 20,
  },
  {
    question: "Have you often felt misunderstood by peers or family?",
    score: 25,
  },
  {
    question: "Have you had specific interests that you know a lot about?",
    score: 20,
  },
  {
    question:
      "Have you struggled with waiting for your turn in conversations or games?",
    score: 20,
  },
  {
    question: "Have you felt the need to follow specific routines daily?",
    score: 25,
  },
  {
    question: "Have you found it difficult to adapt to new environments?",
    score: 25,
  },
  {
    question: "Have you often felt detached from your surroundings?",
    score: 20,
  },
  {
    question:
      "Have you noticed yourself using language differently from your peers?",
    score: 20,
  },
  {
    question: "Have you had difficulty interpreting nonverbal communication?",
    score: 25,
  },
  {
    question: "Have you ever felt a strong need for order or organization?",
    score: 20,
  },
  {
    question: "Have you avoided eye contact during conversations?",
    score: 30,
  },
  { question: "Have you felt overwhelmed by strong emotions?", score: 25 },
  {
    question: "Have you ever felt compelled to repeat phrases or actions?",
    score: 30,
  },
  { question: "Have you had trouble making or keeping friends?", score: 30 },
  {
    question: "Have you found it hard to understand when someone is joking?",
    score: 25,
  },
  {
    question:
      "Have you felt a strong preference for specific routines or rituals?",
    score: 25,
  },
  {
    question: "Have you ever struggled with coordination or fine motor skills?",
    score: 20,
  },
  {
    question:
      "Have you experienced difficulty transitioning from one activity to another?",
    score: 25,
  },
  {
    question: "Have you been sensitive to changes in your environment?",
    score: 30,
  },
  {
    question: "Have you noticed a tendency to take things literally?",
    score: 25,
  },
  {
    question: "Have you felt pressure to conform to social norms?",
    score: 20,
  },
  {
    question: "Have you often felt isolated or alone in group settings?",
    score: 25,
  },
  {
    question: "Have you experienced an unusual attachment to objects or items?",
    score: 20,
  },
  {
    question:
      "Have you ever felt the need to avoid eye contact to feel comfortable?",
    score: 25,
  },
  {
    question: "Have you found it difficult to engage in pretend play?",
    score: 20,
  },
  { question: "Have you had trouble reading facial expressions?", score: 25 },
  {
    question:
      "Have you experienced difficulty in understanding social hierarchies?",
    score: 20,
  },
  {
    question:
      "Have you often felt a disconnect between what you feel and how you show it?",
    score: 25,
  },
  {
    question:
      "Have you found it challenging to navigate complex social situations?",
    score: 30,
  },
  {
    question: "Have you preferred predictable outcomes in various situations?",
    score: 2,
  },
  {
    question:
      "Have you ever felt that your interests are misunderstood by others?",
    score: 25,
  },
  {
    question:
      "Have you noticed that you get easily fatigued from social interactions?",
    score: 25,
  },
  {
    question: "Have you felt compelled to follow strict routines or schedules?",
    score: 25,
  },
  {
    question: "Have you experienced challenges in group work or teamwork?",
    score: 25,
  },
  {
    question:
      "Have you ever felt anxious about making mistakes in social situations?",
    score: 25,
  },
  {
    question: "Have you found it hard to express your needs and wants?",
    score: 25,
  },
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
    Cookies.set("autismPercentage", percentageWithinRange);
    console.log(percentageWithinRange + "autismPercentage");
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
        padding: "20px",
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
