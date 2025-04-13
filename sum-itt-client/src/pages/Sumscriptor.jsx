import React, { useState } from 'react';
import axios from 'axios';

const Sumscriptor = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file.");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("${process.env.REACT_APP_API_URL}/sumscriptor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      setTranscript(res.data.transcript);
    } catch (err) {
      alert("Transcription failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">🎙️ Sumscriptor – Voice/Video to Notes</h2>

      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm text-white bg-gray-700 p-2 rounded-md"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold"
      >
        {loading ? "Transcribing..." : "Upload & Transcribe"}
      </button>

      {transcript && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md mt-6">
          <h4 className="text-lg font-bold mb-2">📝 Transcription</h4>
          <p className="whitespace-pre-line text-gray-300">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default Sumscriptor;
