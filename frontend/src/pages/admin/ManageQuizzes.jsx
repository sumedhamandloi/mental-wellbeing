import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageQuizzes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upcoming Quizzes");

  const tabs = ["Upcoming Quizzes", "Past Quizzes", "Quiz Types"];

  const quizzes = [
    { id: 1, type: "SCQ", event: "Stress Management Workshop", date: "1 June" },
    { id: 2, type: "GWBS", event: "Stress Management Workshop", date: "1 June" },
    { id: 3, type: "TABBPS", event: "Stress Management Workshop", date: "1 June" },
    { id: 4, type: "EI", event: "Stress Management Workshop", date: "1 June" },
    { id: 5, type: "GWBS", event: "Stress Management Workshop", date: "30 May" },
  ];

  const quizTypes = [
    {
      id: 1,
      title: "Self Concept (SCQ)",
      subtitle: "48 Questions · 6 Dimensions",
      frequency: "3 Events",
      dateLastTaken: "12 Jul 2026 • 2:00 PM",
    },
    {
      id: 2,
      title: "General Well-Being (GWBS)",
      subtitle: "55 Questions · 4 Dimensions",
      frequency: "2 Events",
      dateLastTaken: "12 Jul 2026 • 2:00 PM",
    },
    {
      id: 3,
      title: "Type A/B Pattern (TABBPS)",
      subtitle: "33 Questions · Form A+B",
      frequency: "1 Event",
      dateLastTaken: "12 Jul 2026 • 2:00 PM",
    },
    {
      id: 4,
      title: "Emotional Intelligence (EI)",
      subtitle: "50 Questions · 5 Competencies",
      frequency: "3 Events",
      dateLastTaken: "12 Jul 2026 • 2:00 PM",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#386641] font-serif leading-none mb-2">
          Manage Quizzes
        </h1>
        <p className="text-sm text-[#9DB1A3] font-medium">
          Descriptions of all the quizzes
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              activeTab === tab
                ? "bg-[#F3F2F2] border border-[#73D38F] text-[#386641]"
                : "text-[#9DB1A3] hover:text-[#386641]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#F3F2F2] rounded-3xl p-8 flex-1 overflow-auto">
        {(activeTab === "Upcoming Quizzes" || activeTab === "Past Quizzes") && (
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-4 gap-4 px-6 pb-4 border-b border-black/10 font-serif font-semibold text-black">
              <div>Quiz Type</div>
              <div className="text-center">Event</div>
              <div className="text-center">Date</div>
              <div className="text-right pr-6">Performance</div>
            </div>

            <div className="flex flex-col gap-4 mt-6 overflow-y-auto pr-2 pb-10">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="grid grid-cols-4 gap-4 items-center bg-[#E5E5E5] border border-[#2F3C36] rounded-xl px-6 py-4"
                >
                  <div className="text-[#3A8458] font-sans font-medium text-lg">
                    {quiz.type}
                  </div>
                  <div className="text-center text-[#3E4F45] text-sm">
                    {quiz.event}
                  </div>
                  <div className="text-center text-[#3E4F45] text-sm">
                    {quiz.date}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => navigate(`/admin/quizzes/${quiz.id}/results`)}
                      className="bg-[#2E7D4F] hover:bg-[#256641] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Quiz Types" && (
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-3 gap-4 px-6 pb-4 border-b border-black/10 font-serif font-semibold text-black">
              <div>Quiz Type</div>
              <div className="text-center">Frequency</div>
              <div className="text-right">Date Last Taken</div>
            </div>

            <div className="flex flex-col gap-4 mt-6 overflow-y-auto pr-2 pb-10">
              {quizTypes.map((qt) => (
                <div
                  key={qt.id}
                  className="grid grid-cols-3 gap-4 items-center bg-[#E5E5E5] border border-[#2F3C36] rounded-xl px-6 py-4"
                >
                  <div>
                    <div className="text-[#3A8458] font-sans font-medium text-lg">
                      {qt.title}
                    </div>
                    <div className="text-[#3E4F45] text-xs mt-1">
                      {qt.subtitle}
                    </div>
                  </div>
                  <div className="text-center text-[#3E4F45] text-sm">
                    {qt.frequency}
                  </div>
                  <div className="text-right text-[#3E4F45] text-sm pr-4">
                    {qt.dateLastTaken}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuizzes;
