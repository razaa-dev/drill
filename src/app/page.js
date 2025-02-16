"use client";
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import BottomNavigation from "./components/BottomNavigation";
import Questionnaire from "./components/Questionnaire";

export default function DrillPage() {
  const [timed, setTimed] = useState(true);
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  const toggleFlag = (index) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <TopBar timed={timed} />
      <Questionnaire
        flaggedQuestions={flaggedQuestions}
        toggleFlag={toggleFlag}
        timed={timed}
      />
      <BottomNavigation flaggedQuestions={flaggedQuestions} />
    </div>
  );
}