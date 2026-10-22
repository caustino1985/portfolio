import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw, Terminal, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const GovLLMChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Welcome to the **Gov-LLM Cognitive Prosthetic & Research Engine**.\n\nI am configured with full knowledge of Caustin Lee McLaughlin's master portfolio:\n• **CINP-2024-X1 UOSE**: 7-layer Intracranial Neural Array, Neurograi™ graphene, and FDA QMSR 2026 PMA templates.\n• **AstaLabs AutoDiscovery**: 897 experiments, Bayesian belief dynamics, and 17-SNP ADHD risk scoring.\n• **Master Jurisprudence**: SCOTUS Rule 20, 28 U.S.C. § 1491 Tucker Act, § 1631 ultra vires transfers, and ADA Title II (*Tennessee v. Lane*).\n• **PSDLEF & ADR-31 Suite**: $500M USEC 1999 Senior Notes converted at 0.0917 ratio into 45,850,000 LEU common shares, and DYREO HJB stochastic control.\n• **Baltimore Rowhomes Solar Microgrid**: S-EROI ≥ 0.73 kWh/$, 150 kW PV / 300 kWh BESS, and Woodlawn SSA Canal 2100.\n\nHow can I assist your review or analysis today?`,
      timestamp: '16:51',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          projectContext: 'Caustin Lee McLaughlin Master Creative & Systems Portfolio (Android Edition)',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Notice**: ${err.message || 'Unable to connect to model service.'} Please ensure the Gemini API key is configured.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Explain the 7-Layer INA Neural Array & Neurograi substrate',
    'How does the 0.0917 conversion ratio yield 45.85M LEU shares?',
    'Summarize the Tucker Act § 1631 transfer challenge',
    'What is the S-EROI metric for Baltimore rowhome microgrids?',
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl flex flex-col h-[580px] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              Gov-LLM Cognitive Copilot
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono">
                Post-Quantum Encrypted
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">Trained on All Dossiers, Indentures & Court Filings</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMessages([messages[0]])}
          aria-label="Reset chat history"
          className="text-slate-400 hover:text-slate-200 text-[11px] flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-cyan-400'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>
                <span className={`text-[9px] font-mono block mt-1 ${isUser ? 'text-blue-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span className="text-[11px] text-slate-400 font-mono">Gov-LLM is parsing legal & technical vectors...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <span className="text-slate-500 font-mono font-semibold flex-shrink-0">Prompts:</span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(p)}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about neural probes, 0.0917 exchange ratio, SCOTUS briefs..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-all disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
