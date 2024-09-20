'use client';

import { useState } from 'react';
import Navbar from '../(site)/components/Navbar';
import AuthContext from '../context/AuthContext';

export default function ChatPage() {
  const [userMessage, setUserMessage] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }), // Send the user's message
      });

      const data = await response.json();
      console.log(data);
      setBotResponse(data.response.candidates[0].content.parts[0].text || 'No response'); // Handle the bot's response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to parse basic Markdown
  const parseMarkdown = (text: string) => {
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/^(#{1,6})\s*(.*)$/gm, (match, hash, content) => {
      const level = hash.length;
      return `<h${level}>${content}</h${level}>`;
    });
    html = html.replace(/\n/g, '<br>');

    return html;
  };

  return (
       <>
       <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-red-400">
      
      <h1 className="text-4xl font-bold text-white mb-6">PartnerBot</h1>
      <p>Introducing PartnerBot - Your Chatbot friend!</p>
      <div className="w-full max-w-md bg-blue-800 shadow-md rounded-lg p-6 border border-blue-300">
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message here"
          className="w-full h-32 p-4 border border-blue-300 rounded-lg mb-4 text-gray-100 bg-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          Send
        </button>
      </div>
      {botResponse && (
        <div
  className="mt-6 m-5 w-[1000px] bg-blue-100 border border-blue-200 rounded-lg p-4 text-blue-800 mb-6 "
  dangerouslySetInnerHTML={{ __html: parseMarkdown(botResponse) }} // Set parsed HTML
>
  {/* Render the parsed response */}
</div>

      )}
    </div>
    </>

  );
}
