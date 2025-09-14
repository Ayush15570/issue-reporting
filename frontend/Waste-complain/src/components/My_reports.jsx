import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { useSelector } from "react-redux";

const My_reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getReports = async () => {
      try {
        setLoading(true);
        const res = await API.get("/report/my-reports");
        setReports(res.data.data);
      } catch (err) {
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-green-700 mb-12 text-center">
          My Reports 📋
        </h1>

        {/* Loading / Error / Empty State */}
        {loading && <p className="text-center text-gray-500">Loading reports...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && reports.length === 0 && (
          <p className="text-center text-gray-500">No reports found.</p>
        )}

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300"
            >
              {/* Report Type */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {report.type}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-3">{report.description}</p>

              {/* Photo */}
              {report.photo && (
                <div className="overflow-hidden rounded-xl mb-3 border">
                  <img
                    src={report.photo}
                    alt="Report"
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}

              {/* Footer Info */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By: {userData?.username}</span>
                <span>{report.city}</span>
              </div>

              {/* Timestamp */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default My_reports;
