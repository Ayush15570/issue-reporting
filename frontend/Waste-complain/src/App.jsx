import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import API from "./utils/axios";
import Header from "./components/Header";
import React from "react";
import Footer from "./components/Footer";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await API.get("/auth/get-current-user");
        if (res.data && res.data.data) {
          dispatch(login(res.data.data));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoader(false); // only show app after session check
      }
    };

    getUser();
  }, [dispatch]);

  if (loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!loader && <Header />}
 
      <div className="pt-24">
        <Outlet />
      </div>
      {!loader && <Footer />}
    </div>
  );
}


export default App;
