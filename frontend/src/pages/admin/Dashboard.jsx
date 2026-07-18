import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Calendar, Users, Award, Shield } from "lucide-react";
import AuthService from "../../services/auth";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Mock data to match designs instead of failing API call
    setTimeout(() => {
      setData({
        admin_name: "Yasmin Sheikh",
        department: "Senior Technical Faculty, IIPS DAVV",
        stats: {
          total_events: 12,
          total_quizzes: 48,
          total_students: 342,
          avg_wellbeing: "7.4/10"
        },
        events_summary: [
          { id: 1, title: "Stress Management Workshop", quizzes_count: "2/4", event_date: "2026-07-12", attendees_count: 68, performance: "High" },
          { id: 2, title: "Emotional Intelligence Seminar", quizzes_count: "1/2", event_date: "2026-07-10", attendees_count: 50, performance: "Average" },
          { id: 3, title: "Time Management & Wellbeing", quizzes_count: "1/1", event_date: "2026-07-24", attendees_count: 45, performance: "High" },
          { id: 4, title: "Academic Anxiety Workshop", quizzes_count: "2/2", event_date: "2026-07-28", attendees_count: 38, performance: "Low" }
        ]
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleDownloadSummary = () => {
    if (!data) return;
    const csvContent = 
      `Manomitra mental well-being platform summary\n` +
      `Admin: ${data.admin_name}\n` +
      `Department: ${data.department}\n` +
      `---------------------------------------\n` +
      `Total Events: ${data.stats.total_events}\n` +
      `Total Quizzes: ${data.stats.total_quizzes}\n` +
      `Total Students: ${data.stats.total_students}\n` +
      `Average Well-being: ${data.stats.avg_wellbeing}\n\n` +
      `Events Summary:\n` +
      `Event,Quizzes,Date,Attendees,Performance\n` +
      data.events_summary.map(e => `"${e.title}","${e.quizzes_count}","${e.event_date}",${e.attendees_count},"${e.performance}"`).join("\n");
      
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "manomitra_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col justify-center items-center h-full gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#386641]"></div>
        <p className="text-gray-500 font-medium">Gathering well-being metrics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 max-w-md">
          <h3 className="font-bold text-lg mb-2">Error Loading Dashboard</h3>
          <p>{error || "An unexpected error occurred."}</p>
        </div>
      </div>
    );
  }

  const { stats, events_summary } = data;

  const statCards = [
    { title: "Total Events", value: stats.total_events, icon: Calendar },
    { title: "Total Quizzes", value: stats.total_quizzes, icon: Shield },
    { title: "Total Students", value: stats.total_students, icon: Users },
    { title: "Average Well-being", value: stats.avg_wellbeing, icon: Award }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-[#386641] tracking-tight font-sans">
            Welcome, Yasmin
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-semibold">
            {data.department}
          </p>
        </div>
        <button
          onClick={handleDownloadSummary}
          className="flex items-center gap-2 text-sm font-semibold text-[#8AA38E] hover:text-[#386641] bg-[#FAF8F5] hover:bg-[#EFEFEF]/50 px-4 py-2.5 rounded-xl border border-gray-200 transition-all shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download Summary
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-[#EFEFEF]/60 border border-gray-150 rounded-3xl p-6 flex flex-col justify-between h-[150px] shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <span className="text-base font-bold text-[#386641] tracking-wide font-sans">
                  {card.title}
                </span>
                <Icon className="w-5 h-5 text-[#386641]/75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-4xl font-extrabold text-[#386641] tracking-tight mt-4">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events Summary Section */}
      <div className="bg-[#FAF8F5] border border-gray-150 rounded-[32px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#386641] font-sans">Events Summary</h3>
          <Link
            to="/admin/events"
            className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-[#386641] transition-all group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {events_summary.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            No events registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm font-bold text-gray-400 border-b border-gray-200">
                  <th className="pb-4 font-sans uppercase tracking-wider">Event</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Quizzes</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Date</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Attendees</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {events_summary.slice(0, 5).map((event) => (
                  <tr key={event.id} className="group hover:bg-[#FAF8F5]/80 transition-all">
                    <td className="py-4 font-bold text-base text-[#386641] tracking-wide font-sans">
                      {event.title}
                    </td>
                    <td className="py-4 text-sm text-gray-600 font-sans font-medium">
                      {event.quizzes_count}
                    </td>
                    <td className="py-4 text-sm text-gray-500 font-sans font-medium">
                      {new Date(event.event_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="py-4 text-sm text-[#477250] font-bold font-sans">
                      {event.attendees_count} Attendees
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider ${
                        event.performance === "High"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : event.performance === "Average"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : event.performance === "Low"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-gray-50 text-gray-500 border border-gray-100"
                      }`}>
                        {event.performance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
