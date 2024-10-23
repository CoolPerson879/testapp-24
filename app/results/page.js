"use client";
import React from "react";
import Cookies from "js-cookie";

const Results = () => {
  // Retrieve cookie data
  const depressionLowerBound = Cookies.get("depressionLOWER") || "No data"; // Replace with actual cookie names
  const depressionTotal = Cookies.get("depressionTOTAL") || "No data";
  const depressionUpperBound = Cookies.get("depressionUPPER") || "No data";
  const fourthCookieData = Cookies.get("fourthCookie") || "No data"; // For the fourth box

  // Prepare text lines based on cookie data
  const boxData = [
    {
      title: "Depression",
      content: `Cookie Data: ${depressionLowerBound}, ${depressionTotal}, ${thirdCookieData}`,
    },
    {
      title: "Eating Disorder",
      content: `Cookie Data: ${fourthCookieData}`,
    },
    { title: "ADHD", content: "No specific data." },
    { title: "Autism", content: "No specific data." },
  ];

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
      <h1 style={{ color: "#000", textAlign: "center", marginBottom: "20px" }}>
        Results
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Creates two columns
          gap: "20px", // Space between boxes
          maxWidth: "800px", // Maximum width of the grid
          width: "100%",
          margin: "0 auto",
        }}
      >
        {boxData.map((box, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f0f0f0", // Light gray background
              border: "1px solid #ccc", // Light border
              borderRadius: "8px", // Rounded corners
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h2 style={{ color: "#333" }}>{box.title}</h2>
            <p style={{ color: "#555" }}>{box.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
