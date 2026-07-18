import React, { useEffect, useState } from "react";
import { Plus, X, Calendar, MapPin, Check } from "lucide-react";
import AuthService from "../../services/auth";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("past"); // "past" or "active"
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [description, setDescription] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState({
    SCQ: true,
    GWBS: true,
    TABBPS: false,
    EI: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchEvents = () => {
    setLoading(true);
    setTimeout(() => {
      // Mock data matching the designs
      const mockEvents = [
        {
          id: 1,
          title: "Stress Management Workshop",
          venue: "Seminar Hall, IIPS DAVV",
          event_date: "2026-07-12",
          event_time: "2:00 PM",
          quizzes_count: "2/4",
          attendees_count: 68,
          status: "scheduled",
          performance: "Average"
        },
        {
          id: 2,
          title: "Stress Management Workshop",
          venue: "Seminar Hall, IIPS DAVV",
          event_date: "2026-07-12",
          event_time: "2:00 PM",
          quizzes_count: "2/4",
          attendees_count: 68,
          status: "scheduled",
          performance: "Average"
        },
        {
          id: 3,
          title: "Stress Management Workshop",
          venue: "Seminar Hall, IIPS DAVV",
          event_date: "2026-07-12",
          event_time: "2:00 PM",
          quizzes_count: "2/4",
          attendees_count: 68,
          status: "completed",
          performance: "High"
        },
        {
          id: 4,
          title: "Stress Management Workshop",
          venue: "Seminar Hall, IIPS DAVV",
          event_date: "2026-07-12",
          event_time: "2:00 PM",
          quizzes_count: "2/4",
          attendees_count: 68,
          status: "completed",
          performance: "Average"
        }
      ];
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (quiz) => {
    setSelectedQuizzes((prev) => ({
      ...prev,
      [quiz]: !prev[quiz]
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const quizTypes = Object.keys(selectedQuizzes).filter((k) => selectedQuizzes[k]);
    if (quizTypes.length === 0) {
      setFormError("Please select at least one quiz type to assign to this event.");
      setSubmitting(false);
      return;
    }

    const payload = {
      title,
      venue,
      event_date: eventDate,
      event_time: eventTime,
      description,
      quiz_types: quizTypes,
      sequences: quizTypes.map((_, i) => i + 1)
    };

    try {
      // Mock API call to create event since backend is down
      setTimeout(() => {
        const newEvent = {
          id: Date.now(),
          title: payload.title,
          venue: payload.venue,
          event_date: payload.event_date,
          event_time: payload.event_time,
          quizzes_count: `${payload.quiz_types.length}/${payload.quiz_types.length}`,
          attendees_count: 0,
          status: "scheduled",
          performance: "Pending"
        };
        
        setEvents(prev => [...prev, newEvent]);
        setShowAddModal(false);
        
        // Reset form
        setTitle("");
        setVenue("");
        setEventDate("");
        setEventTime("");
        setDescription("");
        setSelectedQuizzes({ SCQ: true, GWBS: true, TABBPS: false, EI: false });
        
        setSubmitting(false);
      }, 500);
    } catch (err) {
      console.error(err);
      setFormError("Failed to create event. Please verify inputs.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col justify-center items-center h-full gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#386641]"></div>
        <p className="text-gray-500 font-medium">Loading events list...</p>
      </div>
    );
  }

  // Filter events based on tab
  const todayStr = new Date().toISOString().split("T")[0];
  
  const pastEvents = events.filter((e) => {
    return e.status === "completed" || e.status === "closed" || e.status === "cancelled" || e.event_date < todayStr;
  });

  const activeEvents = events.filter((e) => {
    return (e.status === "scheduled" || e.status === "ongoing") && e.event_date >= todayStr;
  });

  const displayedEvents = activeTab === "past" ? pastEvents : activeEvents;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-extrabold text-[#386641] tracking-tight font-sans">
            Manage Events
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-semibold">
            Track and manage quizzes
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#386641] hover:bg-[#477250] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-205 pb-2">
        <button
          onClick={() => handleTabChange("past")}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeTab === "past"
              ? "border border-[#477250] bg-[#477250]/5 text-[#386641]"
              : "text-gray-400 hover:text-gray-600 bg-transparent"
          }`}
        >
          Past Events
        </button>
        <button
          onClick={() => handleTabChange("active")}
          className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeTab === "active"
              ? "border border-[#477250] bg-[#477250]/5 text-[#386641]"
              : "text-gray-400 hover:text-gray-600 bg-transparent"
          }`}
        >
          Active Events
        </button>
      </div>

      {/* Events Table Container */}
      <div className="bg-[#FAF8F5] border border-gray-150 rounded-[32px] p-8 shadow-sm">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            No {activeTab} events found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm font-bold text-gray-400 border-b border-gray-200">
                  <th className="pb-4 font-sans uppercase tracking-wider">Event</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Quizzes</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">Date</th>
                  <th className="pb-4 font-sans uppercase tracking-wider">
                    {activeTab === "past" ? "Attendees" : "Registrations"}
                  </th>
                  <th className="pb-4 font-sans uppercase tracking-wider">
                    {activeTab === "past" ? "Performance" : "Manage"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayedEvents.map((event) => (
                  <tr key={event.id} className="group hover:bg-[#FAF8F5]/50 transition-all">
                    {/* Event name & Venue */}
                    <td className="py-5 pr-4">
                      <div className="font-bold text-lg text-[#386641] tracking-wide font-sans mb-1">
                        {event.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {event.venue}
                      </div>
                    </td>
                    
                    {/* Quizzes completed / total */}
                    <td className="py-5 pr-4 text-sm text-gray-600 font-sans font-semibold">
                      {event.quizzes_count}
                    </td>

                    {/* Date and Time */}
                    <td className="py-5 pr-4">
                      <div className="text-sm text-gray-600 font-sans font-semibold mb-1">
                        {new Date(event.event_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </div>
                      <div className="text-xs text-gray-400 font-sans font-medium">
                        {event.event_time}
                      </div>
                    </td>

                    {/* Attendees Count / Registrations Count */}
                    <td className="py-5 pr-4">
                      <span className="text-sm text-[#477250] font-bold font-sans">
                        {event.attendees_count} {activeTab === "past" ? "Attendees" : "Registered"}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-5">
                      <div className="flex items-center justify-between gap-4">
                        {activeTab === "past" ? (
                          <>
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
                            <button className="bg-[#386641] hover:bg-[#477250] text-white text-xs font-bold px-4 py-2.5 rounded-lg tracking-wide shadow-sm hover:shadow transition-all cursor-pointer">
                              View Details
                            </button>
                          </>
                        ) : (
                          <button className="bg-[#386641] hover:bg-[#477250] text-white text-xs font-bold px-5 py-2.5 rounded-lg tracking-wide shadow-sm hover:shadow transition-all cursor-pointer">
                            Manage
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#386641] mb-6 font-sans">Create New Event</h3>

            {formError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-6 border border-red-100 font-semibold font-sans">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddEvent} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Event Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Stress Management Workshop"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#386641]/50 focus:border-[#386641] transition-all text-gray-800 font-sans"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                  placeholder="e.g. Seminar Hall, IIPS DAVV"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#386641]/50 focus:border-[#386641] transition-all text-gray-800 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Event Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#386641]/50 focus:border-[#386641] transition-all text-gray-800 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Event Time</label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#386641]/50 focus:border-[#386641] transition-all text-gray-800 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  placeholder="Brief description of the event's goals..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#386641]/50 focus:border-[#386641] transition-all text-gray-800 font-sans"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-sans">Assign Quizzes</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(selectedQuizzes).map((quiz) => (
                    <label
                      key={quiz}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 cursor-pointer select-none transition-all ${
                        selectedQuizzes[quiz]
                          ? "bg-[#386641]/5 border-[#386641] text-[#386641] font-semibold"
                          : "bg-[#FAF8F5] hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedQuizzes[quiz]}
                        onChange={() => handleCheckboxChange(quiz)}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        selectedQuizzes[quiz]
                          ? "bg-[#386641] border-[#386641] text-white"
                          : "border-gray-300 bg-white"
                      }`}>
                        {selectedQuizzes[quiz] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-sans">{quiz} Assessment</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-[#EFEFEF]/50 transition-all font-sans cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#386641] hover:bg-[#477250] text-white py-3 rounded-xl font-semibold shadow-md transition-all font-sans disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
