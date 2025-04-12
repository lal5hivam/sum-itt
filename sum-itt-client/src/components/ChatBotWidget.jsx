import React, { useState } from "react";
import axios from "axios";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        messages: updatedMessages,
      });

      const reply = res.data.reply;
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "❌ Failed to connect." },
      ]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl"
        >
          💬
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-gray-900 text-white rounded-lg w-80 max-h-[500px] flex flex-col shadow-lg z-50">
          <div className="p-3 font-semibold border-b border-gray-700 bg-gray-800">
            🤖 Sum-itt Assistant
          </div>
          <div className="p-3 flex-1 overflow-y-auto space-y-2 text-sm">
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
          <div className="flex border-t border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 p-2 bg-gray-800 text-white outline-none"
            />
            <button onClick={handleSend} className="px-3 bg-blue-600">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;
