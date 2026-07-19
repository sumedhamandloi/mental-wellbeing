import { useState } from "react";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";

function ManageQuizzes() {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [quizType, setQuizType] = useState("");
  const [quizDate, setQuizDate] = useState("");
  const [quizTime, setQuizTime] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      type: "Self Concept",
      date: "2026-07-12",
      time: "10:00",
      status: "Scheduled",
    },
    {
      id: 2,
      type: "General Well Being",
      date: "2026-07-15",
      time: "14:30",
      status: "Scheduled",
    },
  ]);

  const filtered = quizzes.filter((quiz) =>
    quiz.type.toLowerCase().includes(search.toLowerCase())
  );

  function resetForm() {
    setQuizType("");
    setQuizDate("");
    setQuizTime("");
    setEditingId(null);
  }

  function openCreateModal() {
    resetForm();
    setShowModal(true);
  }

  function saveQuiz() {
    if (!quizType || !quizDate || !quizTime) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId) {
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.id === editingId
            ? {
                ...quiz,
                type: quizType,
                date: quizDate,
                time: quizTime,
              }
            : quiz
        )
      );
    } else {
      const newQuiz = {
        id: Date.now(),
        type: quizType,
        date: quizDate,
        time: quizTime,
        status: "Scheduled",
      };

      setQuizzes([...quizzes, newQuiz]);
    }

    resetForm();
    setShowModal(false);
  }

  function editQuiz(quiz) {
    setEditingId(quiz.id);
    setQuizType(quiz.type);
    setQuizDate(quiz.date);
    setQuizTime(quiz.time);
    setShowModal(true);
  }

  function deleteQuiz(id) {
    if (window.confirm("Delete this quiz?")) {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Manage Quizzes
          </h1>

          <p className="text-gray-500">
            Schedule quizzes for students
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Create Quiz
        </button>

      </div>

      <div className="bg-white rounded-xl shadow mt-8 p-5">

        <div className="relative">

          <Search
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Quiz Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-10"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Quiz Type</th>

              <th className="text-left p-4">Date</th>

              <th className="text-left p-4">Time</th>

              <th className="text-left p-4">Status</th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((quiz) => (

              <tr
                key={quiz.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {quiz.type}
                </td>

                <td className="p-4">
                  {quiz.date}
                </td>

                <td className="p-4">
                  {quiz.time}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {quiz.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() => editQuiz(quiz)}
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteQuiz(quiz.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Quiz" : "Create Quiz"}
              </h2>

              <button
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-5">

              <div>

                <label className="block mb-2 font-medium">
                  Quiz Type
                </label>

                <select
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select Quiz Type</option>

                  <option value="Self Concept">
                    Self Concept
                  </option>

                  <option value="General Well Being">
                    General Well Being
                  </option>

                  <option value="Type A-B Behavioural">
                    Type A-B Behavioural
                  </option>

                  <option value="Emotional Intelligence">
                    Emotional Intelligence
                  </option>

                </select>

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Quiz Date
                </label>

                <input
                  type="date"
                  value={quizDate}
                  onChange={(e) => setQuizDate(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Quiz Time
                </label>

                <input
                  type="time"
                  value={quizTime}
                  onChange={(e) => setQuizTime(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div className="flex justify-end gap-3 pt-4">

                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="border px-5 py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={saveQuiz}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
                >
                  {editingId ? "Update Quiz" : "Create Quiz"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageQuizzes;