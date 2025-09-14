import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout } from "../store/authSlice";
import ReportMap from "./ReportMap";
const Header = () => {
  const user = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authLogout());
    navigate("/login");
  };
  
  return (
    <header className="w-full fixed top-0 left-0 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo + App Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="UrbanEyes Logo"
            className="h-14 w-auto"
          />
          <h2 className="text-2xl font-bold text-green-700 tracking-wide">
            UrbanEyes
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {userData ? (
            <>
              <span className="text-gray-700 font-medium">
                Hi, {userData.fullName || userData.username || "User"} 👋
              </span>
              <Link
                to="/myReports"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200"
              >
                My Reports
              </Link>
              <Link
                to="/reportMap"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200"
              >
                Map Visual
              </Link>
              
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
