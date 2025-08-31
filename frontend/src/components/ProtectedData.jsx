import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/incidents/", {
          headers: {
            Authorization: `Token ${token}`, // Send token in header
          },
        });
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      }
    };

    fetchProtectedData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h2>Protected Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
