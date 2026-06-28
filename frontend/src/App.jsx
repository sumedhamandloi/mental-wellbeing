function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-2">
          Mental Wellbeing
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3 mb-6"
        />

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
}

export default App;