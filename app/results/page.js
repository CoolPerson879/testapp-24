"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "@fontsource/nunito"; // Import Nunito font

const Results = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [depressionLowerBound, setDepressionLowerBound] = useState("No data");
  const [eatingPercentage, setEatingPercentage] = useState("No data");
  const [adhdPercentage, setAdhdPercentage] = useState("No data");
  const [autismPercentage, setAutismPercentage] = useState("No data");
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const depressionData = Cookies.get("depressionPercentage");
    const eatingData = Cookies.get("eatingPercentage");
    const adhdData = Cookies.get("adhdPercentage");
    const autismData = Cookies.get("autismPercentage");

    if (depressionData) setDepressionLowerBound(Number(depressionData));
    if (eatingData) setEatingPercentage(eatingData);
    if (adhdData) setAdhdPercentage(adhdData);
    if (autismData) setAutismPercentage(autismData);
  }, []);

  // Updated results text
  const depressionContent =
    depressionLowerBound === "No data"
      ? "Please complete the depression assessment to view your results."
      : depressionLowerBound < 60
      ? "Your depression assessment suggests a lower level of concern."
      : "Your depression assessment indicates a higher level of concern. Click for resources.";

  const eatingContent =
    eatingPercentage === "No data"
      ? "Please complete the eating disorder assessment to view your results."
      : Number(eatingPercentage) < 61
      ? "Your assessment suggests a lower level of concern for eating disorders."
      : "Your assessment indicates a higher level of concern for eating disorders. Click for resources.";

  const adhdContent =
    adhdPercentage === "No data"
      ? "Please complete the ADHD assessment to view your results."
      : Number(adhdPercentage) < 61
      ? "Your assessment suggests a lower level of concern for ADHD."
      : "Your assessment indicates a higher level of concern for ADHD. Click for resources.";

  const autismContent =
    autismPercentage === "No data"
      ? "Please complete the autism assessment to view your results."
      : Number(autismPercentage) < 61
      ? "Your assessment suggests a lower level of concern for autism."
      : "Your assessment indicates a higher level of concern for autism. Click for resources.";

  // Contact info remains the same
  const depressionContactInfo =
    "Website: www.nami.org \nPhone Numbers: National Suicide Prevention Lifeline: 1-800-273-TALK (1-800-273-8255), Crisis Text Line: Text 'HELLO' to 741741, SAMHSA National Helpline: 1-800-662-HELP (1-800-662-4357), ";
  const eatingContactInfo =
    "Website: www.nationaleatingdisorders.org \nPhone Numbers: NEDA Helpline: 1-800-931-2237, National Alliance on Mental Illness (NAMI): 1-800-950-NAMI (1-800-950-6264), Eating Disorder Hope: 1-800-673-0980, ";
  const adhdContactInfo =
    "Website: www.chadd.org \nPhone Numbers: ADHD National Resource Center: 1-800-233-4050, NAMI (National Alliance on Mental Illness): 1-800-950-NAMI (1-800-950-6264), Crisis Text Line: Text 'HELLO' to 741741, ";
  const autismContactInfo =
    "Website: www.autismspeaks.org \nPhone Numbers: Autism Society: 1-800-328-8476, National Autism Hotline: 1-877-333-ODEM (1-877-333-6336), National Parent Hotline: 1-855-427-2736, ";

  const boxData = [
    {
      title: "Depression",
      content: <p className="result-text">{depressionContent}</p>,
      hasNoData: depressionLowerBound === "No data",
      contactInfo: depressionContactInfo,
    },
    {
      title: "Eating Disorder",
      content: <p className="result-text">{eatingContent}</p>,
      hasNoData: eatingPercentage === "No data",
      contactInfo: eatingContactInfo,
    },
    {
      title: "ADHD",
      content: <p className="result-text">{adhdContent}</p>,
      hasNoData: adhdPercentage === "No data",
      contactInfo: adhdContactInfo,
    },
    {
      title: "Autism",
      content: <p className="result-text">{autismContent}</p>,
      hasNoData: autismPercentage === "No data",
      contactInfo: autismContactInfo,
    },
  ];

  const handleBoxClick = (box) => {
    if (!box.hasNoData) {
      setPopupContent(box.contactInfo);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBackToQuiz = (quizPath) => {
    window.location.href = quizPath;
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

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
        fontFamily: "Nunito, sans-serif", // Apply Nunito font
      }}
    >
      <h1 style={{ color: "#000", textAlign: "center", marginBottom: "10px" }}>
        Mental Health Dashboard
      </h1>
      <h2 style={{ color: "#555", textAlign: "center", marginBottom: "20px" }}>
        Review your assessments and get personalized feedback.
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {boxData.map((box, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              color: "black",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => handleBoxClick(box)}
          >
            <h2 style={{ color: "#333" }}>{box.title}</h2>
            {box.content}

            {index === 0 && box.hasNoData && (
              <button
                onClick={() => handleBackToQuiz("/null1")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#9370DB",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Take Depression Test
              </button>
            )}

            {index === 1 && box.hasNoData && (
              <button
                onClick={() => handleBackToQuiz("/null2")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#9370DB",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Take Eating Disorder Test
              </button>
            )}

            {index === 2 && box.hasNoData && (
              <button
                onClick={() => handleBackToQuiz("/null3")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#9370DB",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Take ADHD Test
              </button>
            )}

            {index === 3 && box.hasNoData && (
              <button
                onClick={() => handleBackToQuiz("/null4")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#9370DB",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Take Autism Test
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Popup card */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h3 style={{ color: "#333" }}>{popupContent}</h3>
          <button
            onClick={handlePopupClose}
            style={{
              display: "block",
              margin: "20px auto 0",
              padding: "10px 20px",
              backgroundColor: "#9370DB",
              color: "white",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Overlay background for the popup */}
      {showPopup && (
        <div
          onClick={handlePopupClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default Results;
