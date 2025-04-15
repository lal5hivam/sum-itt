import { useState } from "react";

const Summarizer = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/summarize`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      alert("Something went wrong while summarizing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📄 Upload PDF or Text File</h2>
      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Upload & Summarize"}
      </button>

      {summary && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">🧠 Summary:</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
