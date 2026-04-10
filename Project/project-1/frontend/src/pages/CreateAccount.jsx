import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("")
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  function handelOncahnge(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true)
    setLoadingText("Craeting your account.....")
    setmessage("")
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/creat-account",
        formData,
        {
          withCredentials: true,
        },
      );
      setLoadingText("Account created successfully ✅");
      
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setmessage(err.response?.data?.message || "Something went wrong");
    }
  }
  return (
    
    <>
      {loading && <FullScreenLoader text={loadingText} />}
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <form
            onSubmit={handelSubmit}
            className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl 
          shadow-2xl p-10 max-w-md w-full flex flex-col gap-6"
          >
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h1>

            {/* USERNAME */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                👤
              </span>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handelOncahnge}
                required
                className="w-full pl-10 pr-4 pt-6 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <label
                className={`absolute left-10 px-1 bg-white transition-all duration-200
              ${
                formData.userName
                  ? "-top-2 text-xs text-gray-600"
                  : "top-3 text-gray-500"
              }`}
              >
                Username
              </label>
            </div>

            {/* EMAIL */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                📧
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handelOncahnge}
                required
                className="w-full pl-10 pr-4 pt-6 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <label
                className={`absolute left-10 px-1 bg-white transition-all duration-200
              ${
                formData.email
                  ? "-top-2 text-xs text-gray-600"
                  : "top-3 text-gray-500"
              }`}
              >
                Email
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handelOncahnge}
                required
                className="w-full pl-10 pr-4 pt-6 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <label
                className={`absolute left-10 px-1 bg-white transition-all duration-200
              ${
                formData.password
                  ? "-top-2 text-xs text-gray-600"
                  : "top-3 text-gray-500"
              }`}
              >
                Password
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
            >
              {loading ? "Creating Account..." : "Creat Account"}
              
            </button>

            {/* MESSAGE */}
            <p
              className={`text-center text-sm ${
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("created")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
            {/* LINK */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-indigo-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 
      bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
        >
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="illustration"
            className="max-w-md w-full"
          />

          <h2 className="text-3xl font-bold mt-6">Welcome 🚀</h2>
          <p className="text-lg text-center mt-2 opacity-90">
            Build your account and start your journey with us
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
