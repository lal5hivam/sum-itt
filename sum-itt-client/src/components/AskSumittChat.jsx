import React, { useState } from "react";
import axios from "axios";

const AskSumittChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat-with-notes", {
        messages: newMessages,
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Failed to respond." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl space-y-4">
      <h3 className="text-xl font-bold mb-2">💬 Ask Sum-itt</h3>

      <div className="h-60 overflow-y-auto bg-gray-900 rounded-md p-3 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.role === "user" ? "bg-blue-700 text-right" : "bg-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-l-md bg-gray-700 text-white outline-none"
          placeholder="Ask something from your notes..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 px-4 rounded-r-md"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default AskSumittChat;
