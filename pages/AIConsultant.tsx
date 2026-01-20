
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Bot, Sparkles, User, Lightbulb } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { MOCK_BASES, MOCK_EVENTS } from '../constants';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AIConsultant: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: '你好呀！我是你的趣玩小助手。我可以帮你推荐附近的兴趣基地、好玩的组局，或者把你简单的经历变成像“小红书”一样精彩的攻略！你想了解点什么？' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Build context for recommendation
      const context = `
        Current App Data:
        Bases: ${JSON.stringify(MOCK_BASES.map(b => ({ name: b.name, desc: b.description })))}
        Events: ${JSON.stringify(MOCK_EVENTS.map(e => ({ title: e.title, base: e.baseName, loc: e.location })))}
        
        Rules:
        1. Be friendly and enthusiastic.
        2. If recommending, use the data provided above.
        3. If the user asks for a "guide" (攻略) or "Xiaohongshu style" (小红书风格), rewrite their input into a trendy social media post with emojis and hashtags.
        4. Use Chinese only.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { parts: [{ text: `Context: ${context}\n\nUser Question: ${userMsg}` }] }
        ],
        config: {
          systemInstruction: '你是一个叫“趣玩”的社交APP的AI顾问，专门负责解答用户疑问、推荐基地和活动，以及帮用户写精美的社交媒体文案（小红书风格）。',
          temperature: 0.8
        }
      });

      const aiResponse = response.text || '哎呀，信号不好，请稍后再试～';
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: '抱歉，我刚才走神了，能再说一遍吗？' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <Bot size={20} className="text-orange-500" />
            <span className="font-bold text-gray-900">趣玩 AI 顾问</span>
          </div>
          <span className="text-[8px] text-green-500 font-bold flex items-center gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
            智能在线中
          </span>
        </div>
        <div className="w-8"></div> {/* Spacer */}
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-orange-500 text-white' : 'bg-white border border-orange-100 text-orange-500'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl border border-gray-100 flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { icon: <Sparkles size={12} />, text: '推荐热门基地' },
          { icon: <Lightbulb size={12} />, text: '如何提升靠谱值？' },
          { icon: <Bot size={12} />, text: '帮我写个攻略' }
        ].map((sug, i) => (
          <button 
            key={i}
            onClick={() => setInput(sug.text)}
            className="whitespace-nowrap bg-white border border-gray-100 px-3 py-1.5 rounded-full text-[10px] text-gray-600 flex items-center gap-1.5 hover:border-orange-200 transition-colors shadow-sm"
          >
            {sug.icon}
            {sug.text}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-1.5 border border-gray-100 focus-within:ring-1 focus-within:ring-orange-100 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问我关于趣玩的一切..."
            className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl transition-all ${input.trim() ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
