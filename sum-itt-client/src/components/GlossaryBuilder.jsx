import React, { useState } from "react";
import axios from "axios";

const GlossaryBuilder = () => {
  const [glossary, setGlossary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGlossary = async () => {
    setLoading(true);
    setGlossary("");
    setError("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/generate-glossary`);
      setGlossary(res.data.glossary);
    } catch (err) {
      setError("❌ Failed to generate glossary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl space-y-4">
      <h3 className="text-xl font-bold mb-2">📚 Glossary Builder</h3>

      <button
        onClick={fetchGlossary}
        className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-md text-white"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Glossary"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {glossary && (
        <div className="whitespace-pre-wrap bg-gray-900 p-4 mt-4 rounded-md text-gray-200 text-sm max-h-[400px] overflow-y-auto">
          {glossary}
        </div>
      )}
    </div>
  );
};

export default GlossaryBuilder;
