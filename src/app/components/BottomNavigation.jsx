"use client";
import React, { useEffect, useState } from "react";
import "./BottomNavigation.css"; // Ensure CSS is linked properly

const BottomNavigation = ({ flaggedQuestions }) => {
  const totalQuestions = 23;
  const questionsPerSection = [5, 6, 5, 7]; // Define how many questions per section
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleNavigation = (direction) => {
    if (direction === "prev" && currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (direction === "next" && currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handleNavigation("prev");
      } else if (event.key === "ArrowRight") {
        handleNavigation("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNavigation]);

  return (
    <nav className="bottom-navigation">
      <div className="left">
        {questionsPerSection.map((count, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            <div className="nav-section">
              {Array.from({ length: count }, (_, index) => {
                const questionNumber =
                  questionsPerSection
                    .slice(0, sectionIndex)
                    .reduce((acc, num) => acc + num, 0) +
                  index +
                  1;

                return (
                  <div
                    key={questionNumber}
                    onClick={() => setCurrentQuestion(questionNumber)}
                    className="nav-question"
                  >
                    <div
                      className={`nav-pointer ${
                        currentQuestion === questionNumber ? "current" : ""
                      }
                      ${flaggedQuestions[questionNumber] ? "flagged" : ""}`}
                    ></div>
                    <div className="completion-ellipse"></div>
                    <div className="question-number">{questionNumber}</div>
                  </div>
                );
              })}
            </div>
            {sectionIndex < questionsPerSection.length - 1 && (
              <div className="separator"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="right">
        <div
          className={`back-button ${currentQuestion === 1 ? "anormal" : ""}`}
          onClick={() => handleNavigation("prev")}
        >
          <img src="/icons/left-arrow-icon.svg" alt="Previous" />
        </div>
        <div
          className={`forward-button ${
            currentQuestion === totalQuestions ? "anormal" : ""
          }`}
          onClick={() => handleNavigation("next")}
        >
          <img src="/icons/right-arrow-icon.svg" alt="Next" />
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
