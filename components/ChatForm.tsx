"use client";
import React, { useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const [message, setMessage] = useState("");

  return (
    <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
      <input
        placeholder="Type your message here..."
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="px-4 py-2 text-white bg-blue-500" type="submit">
        Send
      </button>
    </form>
  );
};

export default ChatForm;
