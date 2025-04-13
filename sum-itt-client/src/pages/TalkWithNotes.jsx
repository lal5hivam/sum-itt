import React, { useState } from "react";
import axios from "axios";
import AskSumittChat from "../components/AskSumittChat";
import GetBulletPoints from "../components/GetBulletPoints";
import GlossaryBuilder from "../components/GlossaryBuilder";



// import GetBulletPoints from "../components/GetBulletPoints"; // ⏳ coming next
// import TakeNotesTest from "../components/TakeNotesTest";     // ⏳ coming next

const TalkWithNotes = () => {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/upload-notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPdfUploaded(true);
      setError("");
    } catch (err) {
      setError("❌ Failed to upload notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-8">
      <h2 className="text-2xl font-bold">📄 Talk-with-Notes</h2>

      {!pdfUploaded ? (
        <div className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="bg-gray-800 p-2 rounded-lg text-white"
          />
          {loading && <p className="text-sm text-gray-300">Uploading...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <button
              onClick={() => setSelectedOption("ask")}
              className={`p-4 rounded-xl ${
                selectedOption === "ask"
                  ? "bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              💬 Ask Sum-itt
            </button>
            <button
              onClick={() => setSelectedOption("bullets")}
              className={`p-4 rounded-xl ${
                selectedOption === "bullets" 
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              📝 Get Bullet Points
            </button>
            <button
              onClick={() => setSelectedOption("glossary")}
              className={`p-4 rounded-xl ${
              selectedOption === "glossary" ? "bg-yellow-700" : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              📘 Glossary Builder
          </button>
            
          </div>

          <div className="mt-6">
            {selectedOption === "ask" && <AskSumittChat />}
            {selectedOption === "bullets" && <GetBulletPoints />}
            {selectedOption === "glossary" && <GlossaryBuilder />}

          </div>
        </>
      )}
    </div>
  );
};

export default TalkWithNotes;
