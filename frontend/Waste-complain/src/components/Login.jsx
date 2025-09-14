import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import API from "../utils/axios";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { accessToken, user } = res.data.data;
      localStorage.setItem("token", accessToken);

      dispatch(authLogin(user)); 

      navigate("/register");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue your SIH journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
