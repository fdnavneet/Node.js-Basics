import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
const Login = () => {
  const navigate=useNavigate()
  const{loading,handelLogin} =useAuth()
   
  const [form, setform] = useState({
    userName:"",
    password:""
  })
  function handelChange(e){
    setform({...form,[e.target.name] : e.target.value})
  }
  async function handelSubmit(e) {
    e.preventDefault();
    await handelLogin({
      userName:form.userName,
      password:form.password
    })
    navigate('/')
  }

  if (loading){
    return (<main><h1>loading.........</h1></main>)
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <form
          onSubmit={handelSubmit}
          className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl 
        shadow-2xl p-10 max-w-md w-full flex flex-col gap-6"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Login
          </h1>

          {/* USERNAME */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              👤
            </span>

            <input
              name="userName"
              onChange={handelChange}
              type="text"
              className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
            />

            <label
              className="absolute left-10 top-3 text-gray-500 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 
            transition-all duration-200 bg-white px-1"
            >
              Username / Email
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>

            <input
            name="password"
              onChange={handelChange}
              type="password"
              className="peer w-full pl-10 pr-4 pt-5 pb-2 rounded-xl bg-gray-50 border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
            />

            <label
              className="absolute left-10 top-3 text-gray-500 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 
            transition-all duration-200 bg-white px-1"
            >
              Password
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
            text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
          >
            Login
          </button>

          {/* LINK */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={"/Register"}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Create Account
            </Link>
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
          alt="login"
          className="max-w-md w-full hover:scale-105 transition"
        />

        <h2 className="text-3xl font-bold mt-6">Welcome Back 🚀</h2>
        <p className="text-lg text-center mt-2 opacity-90">
          Login and continue your journey with us
        </p>
      </div>
    </div>
  );
};

export default Login;
