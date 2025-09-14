import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import API from "../utils/axios";

const ReportMap = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/report/all-reports");
      setReports(res.data.data); 
    } catch (err) {
      console.error(err);
    }
  };
   
  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.type.toLowerCase() === filter.toLowerCase());

  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <div className="w-full h-[600px] p-4 bg-white rounded-xl shadow-md">
      <div className="mb-4 flex items-center gap-4">
        <label>Filter by Type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option>All</option>
          <option>Garbage</option>
          <option>Road</option>
          <option>Factory</option>
          <option>Potholes</option>
          <option>Other</option>
        </select>
      </div>

      <MapContainer center={[23.2599, 77.4126]} zoom={12} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredReports.map((report) => (
          <Marker
            key={report._id}
            position={[report.location.coordinates[1], report.location.coordinates[0]]} // [lat, lng]
          >
            <Popup>
              <div>
                <h3 className="font-bold">{report.type}</h3>
                <p>{report.description}</p>
                {report.aiType && <p>AI Prediction: {report.aiType}</p>}
                {report.photo && (
                  <img src={report.photo} alt="report" className="w-40 h-40 object-cover mt-2 rounded" />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ReportMap;
