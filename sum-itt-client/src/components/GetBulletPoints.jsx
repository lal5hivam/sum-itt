import React, { useState } from "react";
import axios from "axios";

const GetBulletPoints = () => {
  const [loading, setLoading] = useState(false);
  const [bullets, setBullets] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setBullets("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/get-bullets-from-notes`);
      setBullets(res.data.bullets);
    } catch (err) {
      setError("❌ Failed to get summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl space-y-4">
      <h3 className="text-xl font-bold mb-2">📝 Bullet Summary</h3>

      <button
        onClick={handleGenerate}
        className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md text-white"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Bullet Points"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {bullets && (
        <div className="whitespace-pre-wrap bg-gray-900 p-4 mt-4 rounded-md text-gray-200 text-sm max-h-[400px] overflow-y-auto">
          {bullets}
        </div>
      )}
    </div>
  );
};

export default GetBulletPoints;
