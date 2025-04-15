import React, { useState } from "react";
import axios from "axios";

const ExpenseTracker = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(process.env.REACT_APP_API_URL);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/expense-summary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSummary(response.data.summary);
    } catch (err) {
        console.error("Upload error:", err.response || err.message || err);
        alert("Failed to upload file.");
      }
  };

  return (
    <div className="bg-[#1e293b] text-white min-h-screen py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        📊 Bank Statement Expense Tracker
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="text-sm text-gray-200 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200"
        >
          Upload & Analyze
        </button>
      </div>

      {summary && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white w-full max-w-2xl mx-auto space-y-4 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xl font-bold">💰 Total Spent: ₹{summary.total}</h3>

          <div>
            <h4 className="font-semibold mb-1">📄 Top Categories:</h4>
            <ul className="list-disc list-inside">
              {summary.topCategories.map((item, index) => (
                <li key={index}>
                  {item.category}: ₹{item.amount}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-1">📅 Monthly Summary:</h4>
            <ul className="list-disc list-inside">
              {summary.monthlySummary.map((item, index) => (
                <li key={index}>
                  {item.month}: ₹{item.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
