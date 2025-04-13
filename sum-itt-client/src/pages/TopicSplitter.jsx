import React, { useState } from "react";
import axios from "axios";

const TopicSplitter = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file.");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("${process.env.REACT_APP_API_URL}/split-topics", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOutput(res.data.result);
    } catch (err) {
      alert("Topic-wise splitting failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">📚 Topic-wise Notes Splitter</h2>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="bg-gray-700 text-sm p-2 rounded-lg"
        />

      <button
        onClick={handleUpload}
        className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
      >
        {loading ? "Splitting..." : "Upload & Split Notes"}
      </button>

      {output && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md mt-6 whitespace-pre-wrap text-gray-200">
          {output}
        </div>
      )}
    </div>
  );
};

export default TopicSplitter;
