"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const questions = [
  { question: "Do you fidget often?", score: 5 },
  { question: "How often do you feel sad or down?", score: 20 },
  { question: "How often do you feel a bit sad or low?", score: 20 },
  {
    question:
      "Are there activities you used to enjoy that you don't feel excited about anymore?",
    score: 15,
  },
  {
    question: "Do you find it easy to focus on your schoolwork or hobbies?",
    score: 15,
  },
  {
    question: "How often do you feel tired, even after a good night’s sleep?",
    score: 5,
  },
  {
    question: "Have you noticed any changes in your eating habits?",
    score: 10,
  },
  {
    question: "Do you sometimes feel unsure about what might happen next?",
    score: 15,
  },
  {
    question:
      "How often do you feel guilty about something, even if it wasn't your fault?",
    score: 20,
  },
  {
    question: "Do you ever feel frustrated or upset more than usual?",
    score: 15,
  },
  { question: "How easy is it for you to fall asleep or wake up?", score: 10 },
  {
    question:
      "Do you sometimes prefer to be alone instead of hanging out with friends?",
    score: 15,
  },
  {
    question:
      "How often do you feel restless or have a hard time sitting still?",
    score: 10,
  },
  {
    question:
      "Have you experienced any aches or pains that don't seem to have a clear reason?",
    score: 15,
  },
  { question: "Do you think about ways to take care of yourself?", score: 20 },
  {
    question: "How often do your responsibilities feel like too much?",
    score: 20,
  },
  {
    question:
      "Do you enjoy spending time with family and friends as much as you used to?",
    score: 10,
  },
  {
    question:
      "Have you noticed any changes in how well you're doing at school?",
    score: 20,
  },
  {
    question: "Do you sometimes feel like you depend on others for help?",
    score: 15,
  },
  { question: "How often do you talk to yourself in a kind way?", score: 20 },
  {
    question:
      "Have you changed your daily routines, like brushing your teeth or taking baths?",
    score: 10,
  },
  {
    question:
      "Do you sometimes feel a little distant from your friends or family?",
    score: 25,
  },
  { question: "How often do you feel nervous in new situations?", score: 5 },
  {
    question:
      "Have you used things like snacks or games to feel better when you're stressed?",
    score: -5,
  },
  {
    question: "How often do you think about things that happened in the past?",
    score: 20,
  },
  {
    question:
      "Do you find it hard to get excited about things you used to love?",
    score: 20,
  },
  {
    question: "How often do you feel like things might not get better?",
    score: 30,
  },
  {
    question:
      "Do you sometimes feel like crying when something is bothering you?",
    score: 25,
  },
  {
    question: "How often do your feelings change throughout the day?",
    score: 20,
  },
  {
    question: "Have you ever thought about what makes you happy or sad?",
    score: 20,
  },
  {
    question: "How often do you feel like your thoughts are hard to follow?",
    score: 10,
  },
  {
    question: "Do you find it challenging to make choices, even small ones?",
    score: 15,
  },
  {
    question: "How often do you feel like you're just going through your day?",
    score: 5,
  },
  {
    question: "Do you find it hard to feel happy about everyday things?",
    score: 15,
  },
  {
    question:
      "Have you noticed changes in how you feel about spending time with friends?",
    score: 20,
  },
  {
    question: "How often do you feel worried when you're around other kids?",
    score: 20,
  },
  {
    question: "Do you feel tired even when you've had enough rest?",
    score: 20,
  },
  {
    question: "Have you felt empty or like something is missing in your day?",
    score: 25,
  },
  { question: "How often do you skip activities you used to love?", score: 20 },
  {
    question: "Do you ever feel unsure about your skills or abilities?",
    score: 20,
  },
  {
    question:
      "How often do you forget things that you used to remember easily?",
    score: 15,
  },
  { question: "Do you prefer to be alone more often than before?", score: 20 },
  {
    question: "How easy is it for you to keep up with your chores or homework?",
    score: 15,
  },
  {
    question: "How often do you feel like you're not quite yourself?",
    score: 30,
  },
  {
    question: "Do you find it hard to talk to others like you used to?",
    score: 30,
  },
  {
    question:
      "Have you noticed changes in how you feel about being close to people?",
    score: 30,
  },
  {
    question:
      "How often do you feel like others don't understand your feelings?",
    score: 25,
  },
  {
    question: "Do you feel frustrated with how you're feeling sometimes?",
    score: 25,
  },
  {
    question:
      "Have you had changes in your life that you're trying to figure out?",
    score: 25,
  },
  {
    question: "How often do you think about asking for help but don't?",
    score: 25,
  },
  {
    question:
      "Do you have thoughts that keep coming back, even when you want them to go away?",
    score: 25,
  },
  {
    question: "How often do you think about what makes you feel good or bad?",
    score: 10,
  },
  { question: "Do you find it easy to make new friends?", score: 10 },
  {
    question: "Have you felt different than your usual self lately?",
    score: 30,
  },
  {
    question: "How often do you feel excited about something you're doing?",
    score: 15,
  },
  {
    question: "Do you enjoy talking about your feelings with someone?",
    score: 20,
  },
  { question: "How often do you find it hard to relax or unwind?", score: 25 },
  { question: "Do you feel like you have people you can trust?", score: 30 },
  { question: "How often do you think about your favorite things?", score: 5 },
  { question: "Do you like to play games that make you laugh?", score: 5 },
  {
    question: "How often do you feel overwhelmed by school or homework?",
    score: 20,
  },
  {
    question:
      "Have you noticed any changes in your energy levels during the day?",
    score: 15,
  },
  {
    question: "How do you feel when you think about going to school?",
    score: 10,
  },
  {
    question: "Do you ever feel like you need a break from everything?",
    score: 15,
  },
  {
    question: "How often do you feel proud of something you've done?",
    score: 10,
  },
  {
    question: "Have you experienced any changes in your friendships?",
    score: 20,
  },
  { question: "How often do you feel safe and secure at home?", score: 20 },
  { question: "Do you enjoy spending time outdoors or in nature?", score: 10 },
  {
    question:
      "How often do you feel comfortable sharing your thoughts with others?",
    score: 15,
  },
  {
    question: "Have you found any new hobbies that make you happy?",
    score: 10,
  },
  { question: "Do you enjoy spending time with your family?", score: 15 },
  {
    question: "How often do you think about what you're grateful for?",
    score: 10,
  },
  { question: "Have you felt like trying new things lately?", score: 5 },
  {
    question: "How often do you feel content with how your day goes?",
    score: 10,
  },
  {
    question: "Do you like to help others when they're feeling down?",
    score: 20,
  },
  {
    question: "Do you enjoy reading books or stories that make you happy?",
    score: 5,
  },
  {
    question: "How often do you think about what you want to achieve?",
    score: 10,
  },
  {
    question: "Do you feel like you have enough time to do what you enjoy?",
    score: 15,
  },
  {
    question: "How often do you notice beautiful things around you?",
    score: 10,
  },
  {
    question: "Have you felt comfortable talking about your worries?",
    score: 10,
  },
  {
    question: "How often do you feel like you can express yourself?",
    score: 15,
  },
  {
    question: "Do you enjoy listening to music that makes you feel good?",
    score: 5,
  },
  {
    question: "How do you feel when you're part of a team or group?",
    score: 10,
  },
  {
    question: "Do you find it easy to laugh or smile during the day?",
    score: 20,
  },
  { question: "How often do you talk about your dreams and goals?", score: 10 },
  {
    question: "Do you feel happy when you think about your favorite memories?",
    score: 5,
  },
  {
    question: "How often do you find joy in simple things, like a sunny day?",
    score: 15,
  },
  {
    question: "Have you felt proud of your accomplishments recently?",
    score: 15,
  },
  { question: "How do you feel when you think about your future?", score: 10 },
  { question: "Do you enjoy creating art or doing crafts?", score: 15 },
  { question: "How often do you spend time with pets or animals?", score: 10 },
  {
    question: "Have you felt comfortable asking for help when you need it?",
    score: 25,
  },
  { question: "How often do you feel connected to your community?", score: 10 },
  {
    question: "Do you find it easy to share your ideas with others?",
    score: 20,
  },
  { question: "How often do you feel a sense of belonging?", score: 15 },
  {
    question: "Do you like to participate in activities with friends?",
    score: 20,
  },
  {
    question: "How often do you reflect on your thoughts and feelings?",
    score: 20,
  },
  { question: "Have you felt encouraged by someone recently?", score: 10 },
];

const Home = () => {
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
    Cookies.set("depressionPercentage", totalScoreWithMultipliers);
    alert(
      `Your score is ${totalScoreWithMultipliers} and the percentage difference is ${percentageWithinRange}%`
    );
    // window.location.href = "/results";

    // Without is lowerbound, with multipliers is score, upperbound is without * 5
    // Navigate to results page or show them in a new page
    // window.location.href = `/results?totalWithMultipliers=${totalScoreWithMultipliers}&totalWithoutMultipliers=${totalScoreWithoutMultipliers}`;
  };

  const circleColors = [
    "#0074D9", // Darker blue (left)
    "#5fa2e0", // Lighter blue
    "#A9A9A9", // Gray (middle)
    "#9370DB", // Light purple
    "#4B0082", // Dark purple (right)
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

export default Home;
