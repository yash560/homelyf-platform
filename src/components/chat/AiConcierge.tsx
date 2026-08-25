'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Building2, 
  Calculator, 
  Phone, 
  User, 
  ChevronRight,
  CheckCircle2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  propertySuggestions?: typeof PROPERTIES;
  quickReplies?: string[];
  timestamp: string;
}

export default function AiConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Namaste! 🙏 I am Homelyf AI, your personal real estate assistant for Bhopal, Indore & Central India. How can I help you today?',
      quickReplies: [
        '3 BHK in Arera Colony under ₹1.5 Cr',
        'Commercial pre-leased offices with 9%+ yield',
        'Calculate Home Loan EMI for ₹50 Lakhs',
        'Connect with verified agent in MP Nagar'
      ],
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let matchedProps: typeof PROPERTIES = [];
      let quick: string[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('arera') || lower.includes('3 bhk') || lower.includes('luxury')) {
        replyText = 'I found the top verified luxury residences in Arera Colony for you! Emerald Heights is RERA-approved with direct lake views.';
        matchedProps = PROPERTIES.filter(p => p.location.locality.includes('Arera') || p.bedrooms === 3);
        quick = ['Schedule site visit for Emerald Heights', 'Download RERA brochure', 'Calculate EMI'];
      } else if (lower.includes('commercial') || lower.includes('yield') || lower.includes('invest') || lower.includes('office')) {
        replyText = 'Here is our premier pre-leased commercial asset in MP Nagar Zone-2 with 9.2% net yield and a 9-year corporate lease.';
        matchedProps = PROPERTIES.filter(p => p.type === 'commercial' || p.purpose === 'invest');
        quick = ['Download investment memo', 'Speak to Vikramaditya Singh (Commercial Head)'];
      } else if (lower.includes('emi') || lower.includes('loan') || lower.includes('50 lakh')) {
        replyText = 'For a ₹50 Lakh home loan at 8.50% interest over 20 years, your estimated monthly EMI is ₹43,391/month. Total interest payable will be ₹54.14 Lakhs. SBI and HDFC offer instant pre-approvals for Homelyf buyers!';
        quick = ['Open full EMI calculator', 'Apply for pre-approval', 'Show properties under ₹50L'];
      } else if (lower.includes('agent') || lower.includes('broker') || lower.includes('contact')) {
        replyText = 'Our verified senior advisor for Bhopal is Rajesh Sharma (RERA ID: A-BPL-20-192, 4.9★ rating). You can connect directly via WhatsApp at +91 84390 44541.';
        quick = ['Chat with Rajesh on WhatsApp', 'Explore all agents'];
      } else {
        replyText = `Thank you for your inquiry about "${query}". Homelyf offers over 8,000 verified listings in Bhopal and Indore with zero brokerage. Would you like me to connect you with our property desk or search specific localities?`;
        matchedProps = PROPERTIES.slice(0, 2);
        quick = ['Show all listings', 'Talk to Human Advisor (+91 84390 44541)'];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        propertySuggestions: matchedProps.length > 0 ? matchedProps : undefined,
        quickReplies: quick,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Trigger Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
          </div>
          <span className="text-sm font-semibold hidden sm:inline">Ask Homelyf AI</span>
          <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-white/20">
            PRO
          </span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          className="w-[92vw] sm:w-[390px] h-[520px] max-h-[85vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-600 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center">
                  Homelyf AI Advisor
                  <span className="ml-1.5 w-2 h-2 rounded-full bg-emerald-300" />
                </div>
                <div className="text-[10px] text-emerald-100 font-medium">
                  Verified Real Estate Intelligence
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50 dark:bg-gray-950/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Property Suggestions Card */}
                {m.propertySuggestions && m.propertySuggestions.length > 0 && (
                  <div className="mt-2 w-full space-y-1.5">
                    {m.propertySuggestions.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center space-x-2.5 p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs shadow-xs"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 dark:text-white truncate">{p.title}</div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400">{p.location.locality}</div>
                          <div className="font-extrabold text-emerald-600 dark:text-emerald-400">{p.priceFormatted}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Reply Chips */}
                {m.quickReplies && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => handleSend(qr)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-left"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-gray-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 w-20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about properties, localities, EMI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
