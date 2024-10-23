"use client";
import React from "react";

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
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#000", textAlign: "center" }}></h1>
      <p style={{ color: "#000", textAlign: "center", maxWidth: "600px" }}>
        This is designed to help you reflect on your feelings and well-being.
        Answer a series of questions to gain insights into your mental health.
      </p>
      <button
        onClick={handleStart}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Test yourself!
      </button>
    </div>
  );
};

export default Landing;
