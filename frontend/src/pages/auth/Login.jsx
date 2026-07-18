import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/icons/image.png";
import API from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.email.trim()) {
      err.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      err.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      err.password = "Password is required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const form = new URLSearchParams();

      form.append("username", formData.email);
      form.append("password", formData.password);

      const response = await API.post(
        "/auth/login",
        form,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "tokenType",
        response.data.token_type
      );

      switch (response.data.role) {
        case "student":
          navigate("/student/dashboard");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;

        case "superuser":
          navigate("/superuser/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#16342F] flex items-center justify-center px-6 py-6">

      <div className="w-[92vw] max-w-[1650px] h-[92vh] min-h-[950px] bg-white rounded-[35px] shadow-[0_35px_90px_rgba(0,0,0,0.35)] overflow-hidden grid lg:grid-cols-[40%_60%]">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0B3B33] via-[#1E6655] to-[#4DA387]">

          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-white/5"></div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full px-16">

            <div className="bg-white rounded-full p-2 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">

              <img
                src={logo}
                alt="logo"
                className="w-52 h-52 object-contain"
              />

            </div>

            <h1 className="mt-6 text-7xl font-serif font-bold  text-[#E9F7EF]">

             ManoMitra

            </h1>

            <p className="mt-5 text-3xl text-green-100">
              Friend of the Mind
            </p>

            <p className="mt-10 max-w-lg text-center text-2xl leading-9 text-green-50">

              Welcome back to Manomitra.

              Login to continue your
              mental wellbeing journey,
              attend workshops,
              counselling sessions,
              and wellbeing events.

            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="flex flex-col justify-center px-20 py-10 lg:px-24">

          <div className="lg:hidden flex justify-center mb-10">

            <div className="bg-white rounded-full p-2 shadow-xl">

              <img
                src={logo}
                alt="logo"
                className="w-28 h-28 object-contain"
              />

            </div>

          </div>

          <h2 className="text-[100px] mb-15 font-extrabold leading-none text-[#143E36]">

            Welcome Back

          </h2>

          <p className="mt-4 mb-12 text-6xl text-gray-500">

            Login to your account

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
                      {/* Email */}

          <div>

            <label className="block mb-4 font-semibold text-gray-700 text-4xl">
              Email Address :
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-7 py-6 text-3xl outline-none transition-all duration-300 focus:border-[#1D5C4F] focus:bg-white focus:ring-4 focus:ring-[#1D5C4F]/20"
            />

            {errors.email && (
              <p className="mt-2 text-xl text-base text-red-500">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="block mb-4 font-semibold text-gray-700 text-4xl">
              Password :
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-7 py-6 text-3xl pr-16 text-xxxl outline-none transition-all duration-300 focus:border-[#1D5C4F] focus:bg-white focus:ring-4 focus:ring-[#1D5C4F]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1D5C4F]"
              >

                {showPassword ? (
                  <EyeOff size={26} />
                ) : (
                  <Eye size={26} />
                )}

              </button>

            </div>

            {errors.password && (
              <p className="mt-2 text-xl text-base text-red-500">
                {errors.password}
              </p>
            )}

          </div>

          {/* Forgot Password */}

          <div className="flex justify-end">

            <Link
              to="/forgot-password"
              className="text-3xl font-semibold text-[#1D5C4F] hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-[#164C40] via-[#2F7D68] to-[#52A98A] py-6 text-3xl font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Divider */}

          <div className="flex items-center gap-5">

            <div className="h-px flex-1 bg-gray-300"></div>

            <span className="text-2xl font-semibold text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-300"></div>

          </div>

          {/* Register */}

          <div className="text-center">

            <p className="text-3xl text-gray-600">

              Don't have an account?

            </p>

            <Link
              to="/register"
              className="mt-3 inline-block text-4xl font-bold text-[#1D5C4F] hover:underline"
            >
              Create New Account
            </Link>

          </div>
                </form>

    </div>

  </div>

</div>

  );

};

export default Login;