import React, { useState } from "react";
import axios from "axios";

const FlashcardGenerator = () => {
  const [file, setFile] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a file first.");
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/generate-flashcards`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const parsedCards = res.data.flashcards.split("\n\n").map(card => {
        const [q, a] = card.split("\n");
        return { question: q?.replace(/^Q:\s*/, ""), answer: a?.replace(/^A:\s*/, "") };
      });

      setCards(parsedCards);
    } catch (err) {
      console.error("Flashcard error:", err.response?.data || err.message);
      alert("Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-4">🧠 Flashcard Generator</h2>
      <input type="file" accept=".pdf,.txt" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      {cards.length > 0 && (
        <div className="mt-6 space-y-4">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded shadow">
              <h4 className="font-semibold">Q: {card.question}</h4>
              <p className="text-green-300">A: {card.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardGenerator;
