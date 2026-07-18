import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";

const QuizResults = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Using this to potentially fetch actual data later

  // Determine quiz type based on ID for mock purposes
  let quizType = "SCQ";
  let quizName = "Self Concept";
  if (id === "2") {
    quizType = "GWBS";
    quizName = "General Well-Being";
  } else if (id === "3") {
    quizType = "TABBPS";
    quizName = "Type A/B Personality";
  } else if (id === "4") {
    quizType = "EI";
    quizName = "Emotional Intelligence";
  }

  // Mock data based on quiz type
  let students = [];
  
  if (quizType === "TABBPS") {
    students = [
      { name: "Raju Singh", rollNo: "IT-2k21-86", scoreA: 85, scoreB: 45, interpretation: "Type A" },
      { name: "Jay Shah", rollNo: "IT-2k21-86", scoreA: 40, scoreB: 90, interpretation: "Type B" },
      { name: "Amit Shah", rollNo: "IT-2k21-86", scoreA: 65, scoreB: 68, interpretation: "Balanced" },
      { name: "Narendra Modi", rollNo: "IT-2k21-86", scoreA: 70, scoreB: 72, interpretation: "Balanced" },
      { name: "Mohan Yadav", rollNo: "IT-2k21-86", scoreA: 50, scoreB: 50, interpretation: "No strong pattern" },
      { name: "Yogi Adityanath", rollNo: "IT-2k21-86", scoreA: 35, scoreB: 95, interpretation: "Type B" },
      { name: "Rahul Gandhi", rollNo: "IT-2k21-86", scoreA: 92, scoreB: 38, interpretation: "Type A" },
    ];
  } else if (quizType === "GWBS") {
    students = [
      { name: "Raju Singh", rollNo: "IT-2k21-86", score: 45, interpretation: "Low" },
      { name: "Jay Shah", rollNo: "IT-2k21-86", score: 75, interpretation: "Average" },
      { name: "Amit Shah", rollNo: "IT-2k21-86", score: 92, interpretation: "High" },
      { name: "Narendra Modi", rollNo: "IT-2k21-86", score: 98, interpretation: "High" },
      { name: "Mohan Yadav", rollNo: "IT-2k21-86", score: 70, interpretation: "Average" },
      { name: "Yogi Adityanath", rollNo: "IT-2k21-86", score: 30, interpretation: "Low" },
      { name: "Rahul Gandhi", rollNo: "IT-2k21-86", score: 88, interpretation: "High" },
    ];
  } else {
    // Default (SCQ / EI)
    students = [
      { name: "Raju Singh", rollNo: "IT-2k21-86", score: 67, interpretation: "Below Average" },
      { name: "Jay Shah", rollNo: "IT-2k21-86", score: 125, interpretation: "Average" },
      { name: "Amit Shah", rollNo: "IT-2k21-86", score: 180, interpretation: "Above Average" },
      { name: "Narendra Modi", rollNo: "IT-2k21-86", score: 221, interpretation: "High" },
      { name: "Mohan Yadav", rollNo: "IT-2k21-86", score: 100, interpretation: "Average" },
      { name: "Yogi Adityanath", rollNo: "IT-2k21-86", score: 40, interpretation: "Low" },
      { name: "Rahul Gandhi", rollNo: "IT-2k21-86", score: 213, interpretation: "High" },
    ];
  }

  const getInterpretationBadge = (level) => {
    switch (level) {
      case "Below Average":
        return "bg-[#E5B58E] text-black"; // Orange-ish
      case "Average":
      case "Balanced":
      case "No strong pattern":
        return "bg-[#EAE27E] text-black"; // Yellow-ish
      case "Above Average":
        return "bg-[#91E8A1] text-black"; // Light Green
      case "High":
      case "Type A":
      case "Type B":
        return "bg-[#386641] text-white"; // Dark Green
      case "Low":
        return "bg-[#E87E7E] text-black"; // Red
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/quizzes")}
          className="flex items-center text-[#5B5B5B] font-semibold text-sm hover:text-black mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Manage Quizzes
        </button>

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#386641] font-serif leading-none mb-2">
              Quiz Results
            </h1>
            <p className="text-sm text-[#9DB1A3] font-semibold">
              {quizName} • Stress Management Workshop • 6 June 2026 • 2:00 PM
            </p>
          </div>

          <button className="flex items-center gap-2 bg-[#2E7D4F] hover:bg-[#256641] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
            Select Competency
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#F3F2F2] rounded-3xl p-8 flex-1 overflow-auto">
        <div className="flex flex-col h-full">
          {quizType === "TABBPS" ? (
            <>
              <div className="grid grid-cols-5 gap-4 px-6 pb-4 border-b border-black/10 font-serif font-semibold text-black">
                <div>Student Name</div>
                <div className="text-center">Roll No.</div>
                <div className="text-center">Score A</div>
                <div className="text-center">Score B</div>
                <div className="text-center">Interpretation</div>
              </div>

              <div className="flex flex-col gap-4 mt-6 overflow-y-auto pr-2 pb-10">
                {students.map((student, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-5 gap-4 items-center bg-[#E5E5E5] border border-transparent hover:border-[#2F3C36]/20 rounded-xl px-6 py-3 transition-colors"
                  >
                    <div className="text-black font-serif text-lg">
                      {student.name}
                    </div>
                    <div className="text-center text-black font-sans text-base">
                      {student.rollNo}
                    </div>
                    <div className="text-center text-black font-sans text-base">
                      {student.scoreA}
                    </div>
                    <div className="text-center text-black font-sans text-base">
                      {student.scoreB}
                    </div>
                    <div className="flex justify-center">
                      <span
                        className={`px-6 py-1.5 rounded-full text-sm font-medium min-w-[140px] text-center ${getInterpretationBadge(
                          student.interpretation
                        )}`}
                      >
                        {student.interpretation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 px-6 pb-4 border-b border-black/10 font-serif font-semibold text-black">
                <div>Student Name</div>
                <div className="text-center">Roll No.</div>
                <div className="text-center">Score</div>
                <div className="text-center">Interpretation</div>
              </div>

              <div className="flex flex-col gap-4 mt-6 overflow-y-auto pr-2 pb-10">
                {students.map((student, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-4 items-center bg-[#E5E5E5] border border-transparent hover:border-[#2F3C36]/20 rounded-xl px-6 py-3 transition-colors"
                  >
                    <div className="text-black font-serif text-lg">
                      {student.name}
                    </div>
                    <div className="text-center text-black font-sans text-base">
                      {student.rollNo}
                    </div>
                    <div className="text-center text-black font-sans text-base">
                      {student.score}
                    </div>
                    <div className="flex justify-center">
                      <span
                        className={`px-6 py-1.5 rounded-full text-sm font-medium min-w-[140px] text-center ${getInterpretationBadge(
                          student.interpretation
                        )}`}
                      >
                        {student.interpretation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
