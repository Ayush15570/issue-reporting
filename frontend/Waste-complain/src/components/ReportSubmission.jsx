import React, { useState, useEffect } from "react";
import API from "../utils/axios";

const ReportSubmission = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(""); // ✅ preview state
  const [coordinates, setCoordinates] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const[detecting,setDetecting] = useState(false)

  // Auto-detect user location
  const handleDetectLocation = () => {
    
    if (navigator.geolocation) {
      setDetecting(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates(`${longitude},${latitude}`);
          setDetecting(false)
          
        },
        () => {
          setError("Unable to get your location. Please allow location access.");
          setDetecting(false)
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    } else {
      setPhotoPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!type || !description || !photo || !coordinates) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to submit a report.");
        return;
      }

      const formData = new FormData();
      formData.append("type", type);
      formData.append("description", description);
      formData.append("photo", photo);
      formData.append("location", coordinates);
      formData.append("city", city);

      await API.post("/report/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Report submitted successfully!");
      setType("");
      setDescription("");
      setPhoto(null);
      setPhotoPreview(""); // reset preview
      setCity("");
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-2">
          Submit a Report
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Help us identify and resolve issues in your city 🌍
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Type of Complaint
            </label>
            <input
              type="text"
              placeholder="e.g. Garbage issue, Road damage"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
              className="w-full px-4 py-2 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
            />

           
            {photoPreview && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Preview:</p>
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-60 object-cover rounded-xl shadow-md border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              City (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
           <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDetectLocation}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-all"
            >
              {detecting ? "Detecting..." : "Auto Detect Location"}
            </button>
            </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all duration-200"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportSubmission;
