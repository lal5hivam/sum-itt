import { useState } from "react";
import axios from "axios";

const VideoSummarizer = () => {
  const [url, setUrl] = useState("");
  const [essay, setEssay] = useState("");
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) return alert("Please enter a YouTube URL");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/summarize-video", { url });
      setEssay(res.data.essay);
      setBullets(res.data.bullets);
    } catch (err) {
      alert("Failed to summarize video.");
      console.error(err.response || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Paste YouTube video link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>
      </div>

      {essay && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-2">📝 Essay-style Summary</h3>
          <p className="text-gray-200">{essay}</p>

          <h4 className="text-lg font-bold mt-6 mb-2">🔹 Key Bullet Points</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {bullets.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoSummarizer;
