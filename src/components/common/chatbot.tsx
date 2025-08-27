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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Toggle Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="group bg-black dark:bg-white text-white dark:text-black w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[32rem] bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#222222] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#F8F8F8] dark:bg-[#111111] border-b border-[#E5E5E5] dark:border-[#222222] p-4 flex justify-between items-center">
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-black dark:text-white">
              Linku
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors duration-200 hover:scale-110"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[22rem]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 rounded-2xl font-['Inter'] text-sm leading-relaxed
                    ${msg.sender === 'user'
                      ? 'bg-black dark:bg-white text-white dark:text-black ml-4'
                      : 'bg-[#F8F8F8] dark:bg-[#111111] text-black dark:text-white mr-4'
                    }
                    shadow-sm hover:shadow-md transition-shadow duration-200
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 fade-in">
                <div className="bg-[#F8F8F8] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] px-4 py-3 rounded-2xl mr-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State with Prebuilt Questions */}
            {messages.length === 0 && (
              <div className="space-y-4 animate-in slide-in-from-bottom-3 fade-in duration-500">
                <div className="text-center">
                  <p className="text-[#444444] dark:text-[#CCCCCC] font-['Inter'] text-sm mb-4">
                    Hi! How can I help you today?
                  </p>
                  <p className="text-[#444444] dark:text-[#CCCCCC] font-['Inter'] text-xs mb-4">
                    Or try one of these questions:
                  </p>
                </div>
                <div className="space-y-2">
                  {prebuiltQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="w-full text-left p-3 bg-[#F8F8F8] dark:bg-[#111111] hover:bg-[#E5E5E5] dark:hover:bg-[#222222] rounded-xl text-sm text-black dark:text-white font-['Inter'] transition-all duration-200 hover:scale-[1.02] hover:shadow-sm border border-transparent hover:border-[#E5E5E5] dark:hover:border-[#222222]"
                      disabled={loading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#E5E5E5] dark:border-[#222222] p-4 bg-[#F8F8F8] dark:bg-[#111111]">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-3 border border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black text-black dark:text-white rounded-xl font-['Inter'] text-sm placeholder-[#444444] dark:placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={loading ? "Thinking..." : "Ask me anything..."}
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-[#F8F8F8] dark:focus:ring-offset-[#111111]"
                disabled={loading}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
