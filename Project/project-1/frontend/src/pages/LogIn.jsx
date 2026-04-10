import axios from "axios";
import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";
import FullScreenLoader from "./FullScreenLoader";

const Login = () => {
  const { setUser } = useContext(Authcontext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        form,
        {
          withCredentials: true,
        },
      );
      setMessage(res.data.message);
      

      
      setTimeout(() => {
        setLoading(false)
        setUser(res.data.user);
        navigate("/CreatePost");
      }, 1500);
    } catch (err) {
      setLoading(false)
      setMessage(err.response?.data?.message || "something went wrong");
    } finally {
      
    }
  }

  return (
    <>
    {loading && <FullScreenLoader text="Logging you in..." />}
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl 
          shadow-2xl p-10 max-w-md w-full flex flex-col gap-6"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          {/* USERNAME */}
          <div className="relative">
            {/* ICON */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              👤
            </span>

            {/* INPUT */}
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
            />

            {/* LABEL */}
            <label
              className={`absolute left-10 px-1 bg-white transition-all duration-200 ${form.userName ? "-top-2 text-xs text-gray-600" : "top-3 text-gray-500"}
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500`}
            >
              Username / Email
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            {/* ICON */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>

            {/* INPUT */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
            />

            {/* LABEL */}
            <label
              className={`absolute left-10 px-1 bg-white transition-all duration-200 ${form.password ? "-top-2 text-xs text-gray-600" : "top-3 text-gray-500"}
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500`}
            >
              Password
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500  text-white font-semibold shadow-lg 
            hover:scale-105 active:scale-95 transition"
          >
            {loading ? "Loading...." : "login"}
          </button>

          {/* MESSAGE */}
          <p
            className={`text-center text-sm ${message.toLowerCase().includes("success") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </p>

          {/* LINK */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/CreateAccount")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Create Account
            </span>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <img
          src="https://illustrations.popsy.co/gray/web-design.svg"
          alt="login"
          className="max-w-md w-full hover:scale-105 transition"
        />

        <h2 className="text-3xl font-bold mt-6">Welcome Back 🚀</h2>
        <p className="text-lg text-center mt-2 opacity-90">
          Login and continue your journey with us
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
