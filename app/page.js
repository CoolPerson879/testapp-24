"use client";
import React from "react";
import "@fontsource/nunito";

const Landing = () => {
  const handleStart = () => {
    // Navigate to the questionnaire page
    window.location.href = "/results"; // Adjust the path if your questionnaire is in a different location
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "Nunito, sans-serif",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #5fa2e0, #9370DB)", // Gradient colors
          color: "white",
          padding: "40px 20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ fontSize: "2em", margin: "0 0 10px" }}>
          Empower Your Mind
        </h1>
        <p style={{ fontSize: "1.1em" }}>
          Reflect on your feelings and well-being with our personalized
          assessments.
        </p>
      </div>

      {/* Description */}
      <p style={{ color: "#000", maxWidth: "600px", margin: "0 0 20px" }}>
        Answer a series of questions to gain insights into your mental health
        and well-being.
      </p>

      {/* Call to Action Button */}
      <button
        onClick={handleStart}
        style={{
          padding: "12px 25px",
          backgroundColor: "#9370DB",
          color: "white",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "1.1em",
          transition: "background-color 0.3s, transform 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#45a049"; // Darken the button
          e.currentTarget.style.transform = "scale(1.05)"; // Scale up on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#4CAF50"; // Reset the button color
          e.currentTarget.style.transform = "scale(1)"; // Reset the scale
        }}
      >
        Test Yourself!
      </button>

      {/* Benefits Section */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#5fa2e0" }}>Why Take the Questionnaire?</h2>
        <ul
          style={{
            textAlign: "left",
            margin: "20px 0",
            listStyleType: "disc",
            paddingLeft: "20px",
            color: "black",
          }}
        >
          <li>Gain personalized insights into your mental health.</li>
          <li>Identify areas of strength and opportunities for improvement.</li>
          <li>Access tailored resources based on your results.</li>
          <li>Take the first step towards better mental well-being.</li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#5fa2e0" }}>What Our Users Say</h2>
        <blockquote
          style={{ fontStyle: "italic", color: "#333", margin: "10px 0" }}
        >
          "This questionnaire helped me understand my feelings better and
          provided me with resources that truly made a difference." - Alex M.
          (personal friend)
        </blockquote>
        <blockquote
          style={{ fontStyle: "italic", color: "#333", margin: "10px 0" }}
        >
          "I didn't realize how much I needed this until I took the test. It was
          eye-opening!" - Jamie L. (random user)
        </blockquote>
      </div>
    </div>
  );
};

export default Landing;
