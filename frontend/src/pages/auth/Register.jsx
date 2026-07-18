import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/icons/image.png";
import API from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    enrollment_no: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    semester: "",
    session: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    let err = {};

    if (!formData.name.trim()) err.name = "Enter your name";

    if (!formData.enrollment_no.trim())
      err.enrollment_no = "Enter enrollment number";

    if (!formData.email.trim()) err.email = "Enter email";

    if (
      formData.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      err.email = "Invalid email";

    if (!/^[6-9]\d{9}$/.test(formData.phone)) err.phone = "Enter valid phone";

    if (!formData.gender) err.gender = "Select gender";

    if (!formData.course) err.course = "Select course";

    if (!formData.semester) err.semester = "Select semester";

    if (!formData.session) err.session = "Select session";

    if (formData.password.length < 8) err.password = "Minimum 8 characters";

    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords don't match";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await API.post("/auth/register/student", {
        enrollment_no: formData.enrollment_no,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        course: formData.course,
        semester: Number(formData.semester),
        session: formData.session,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#16342F] flex items-center justify-center px-6 py-6">
      <div className="w-[92vw] max-w-[1650px] h-[92vh] min-h-[950px] bg-white rounded-[35px] shadow-[0_35px_90px_rgba(0,0,0,0.35)] overflow-hidden grid lg:grid-cols-[40%_60%]">
        {/* LEFT PANEL */}

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0E3B34] via-[#1D5C4F] to-[#3D8B73]">
          {/* Decorative circles */}

          <div className="absolute -top-28 -left-28 w-72 h-72 rounded-full bg-white/10"></div>

          <div className="absolute bottom-0 -right-28 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5"></div>

          <div className="relative z-10 flex flex-col justify-center items-center w-full px-16">
          <div className="flex items-center justify-center">

  <div className="bg-white rounded-full p-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">

    <img
      src={logo}
      alt="Manomitra Logo"
      className="w-52 h-52 object-contain"
    />

  </div>

</div>

           <h1 className="mt-6 text-7xl font-serif font-extrabold text-[#E9F7EF]">ManoMitra</h1>

            <p className="mt-3 text-3xl text-green-100">Friend of the Mind</p>

            <p className="mt-10 text-center text-2xl leading-8 text-green-50 max-w-md">
              A safe space designed for IIPS students to participate in wellness
              events, counselling sessions, workshops and mental health quizzes.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="flex flex-col justify-center px-8 py-10 lg:px-16">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#D9F99D] flex items-center justify-center">
              <img src={logo} alt="logo" className="w-14 h-14" />
            </div>

            <h2 className="text-3xl font-bold text-[#1D5C4F] mt-4">
              Manomitra
            </h2>
          </div>

          <h2 className="text-xl lg:text-7xl font-bold text-[#194D42]">
            Student Registration
          </h2>

          <p className="text-gray-500 mt-8 mb-16 text-3xl">
            Create your account to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
          >
            {" "}
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              />

              {errors.name && (
                <p className="text-red-500 text-xl mt-1">{errors.name}</p>
              )}
            </div>
            {/* Enrollment */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Enrollment Number
              </label>

              <input
                type="text"
                name="enrollment_no"
                value={formData.enrollment_no}
                onChange={handleChange}
                placeholder="Enrollment Number"
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              />

              {errors.enrollment_no && (
                <p className="text-red-500 text-xl mt-1">
                  {errors.enrollment_no}
                </p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                placeholder="9876543210"
                className="w-full px-5 py-4 rounded-2xl text-2xl  border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              />

              {errors.phone && (
                <p className="text-red-500 text-xl mt-1">{errors.phone}</p>
              )}
            </div>
            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@iips.edu.in"
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              />

              {errors.email && (
                <p className="text-red-500 text-xl mt-1">{errors.email}</p>
              )}
            </div>
            {/* Gender */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-xl mt-1">{errors.gender}</p>
              )}
            </div>
            {/* Course */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              >
                <option value="">Select Course</option>

                <option value="M.Tech IT">M.Tech IT</option>

                <option value="M.Tech CSE">M.Tech CSE</option>

                <option value="MBA">MBA</option>

                <option value="MCA">MCA</option>

                <option value="B.Com">B.Com</option>
              </select>

              {errors.course && (
                <p className="text-red-500 text-xl mt-1">{errors.course}</p>
              )}
            </div>
            {/* Semester */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Semester
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              >
                <option value="">Select Semester</option>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>

              {errors.semester && (
                <p className="text-red-500 text-xl mt-1">{errors.semester}</p>
              )}
            </div>
            {/* Session */}
            <div>
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Academic Session
              </label>

              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
              >
                <option value="">Select Session</option>

                <option value="2023-2028">2023-2028</option>

                <option value="2024-2029">2024-2029</option>

                <option value="2025-2030">2025-2030</option>
              </select>

              {errors.session && (
                <p className="text-red-500 text-xl mt-1">{errors.session}</p>
              )}
            </div>
            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2F6F5E]"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xl mt-1">{errors.password}</p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="md:col-span-2">
              <label className="block text-3xl font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-5 py-4 rounded-2xl text-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#2F6F5E] focus:ring-4 focus:ring-[#2F6F5E]/20 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2F6F5E]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={22} />
                  ) : (
                    <Eye size={22} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-3 bg-gradient-to-r from-[#1B5E54] via-[#2F7D68] to-[#47A37F] hover:from-[#174E45] hover:via-[#296C5A] hover:to-[#3D9070] text-white py-4 rounded-2xl font-bold text-3xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-2xl">Already have an account?</p>

            <Link
              to="/login"
              className="inline-block mt-5 text-[#1B5E54] font-bold hover:underline text-2xl"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
