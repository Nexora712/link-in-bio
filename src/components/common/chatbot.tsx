"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const prebuiltQuestions = [
    "What is LinkNest?",
    "How do I use the builder?",
    "What are the pricing plans?",
  ];

  const handleSend = useCallback(async (prompt?: string) => {
    const userMessage = prompt ?? input;
    if (!userMessage.trim() || loading) return;

    // append user message
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
        signal: controller.signal,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to fetch response');
      }

      const { reply } = await response.json();
      setMessages((prev) => [...prev, { text: reply, sender: 'ai' }]);
    } catch (e) {
      if ((e as any)?.name !== 'AbortError') {
        setMessages((prev) => [...prev, { text: 'Sorry, something went wrong. Please try again.', sender: 'ai' }]);
      }
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold">Linku</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-500 ml-auto' : 'bg-gray-700 mr-auto'}`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Or try one of these questions:</p>
                {prebuiltQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left p-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-700 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 border border-gray-600 bg-gray-700 rounded-lg disabled:opacity-60"
              placeholder={loading ? "Thinking..." : "Ask me anything..."}
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              className="ml-2 p-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
              disabled={loading}
              aria-label="Send message"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}