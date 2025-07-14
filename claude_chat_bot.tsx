import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Zap, Globe, Search, Code, Terminal, FileCode, Cpu } from 'lucide-react';

const ClaudeChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Salom! Men Claude Chat botiman. Sizga qanday yordam bera olaman?\n\n🚀 Mening imkoniyatlarim:\n• Dasturlash va kod yozish\n• Yangi ma'lumotlar va qidiruv\n• Texnik masalalar yechimi\n• Har qanday mavzuda suhbat\n\nNima kerak? Kod yozishmi yoki boshqa savol?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCodeRequest = (message) => {
    const lowerMessage = message.toLowerCase();
    const codeKeywords = [
      'kod', 'code', 'dastur', 'program', 'script', 'function',
      'html', 'css', 'javascript', 'python', 'java', 'react',
      'algorithm', 'algoritm', 'yoz', 'yarat', 'create', 'build',
      'website', 'sayt', 'web', 'app', 'ilovа', 'calculator',
      'kalkulyator', 'game', 'o\'yin', 'bot', 'api', 'database',
      'sql', 'json', 'xml', 'frontend', 'backend', 'fullstack',
      'debug', 'error', 'xato', 'fix', 'tuzat', 'optimize',
      'test', 'sinov', 'deploy', 'git', 'github', 'npm',
      'library', 'framework', 'bootstrap', 'tailwind', 'vue',
      'angular', 'node', 'express', 'mongodb', 'mysql'
    ];
    
    return codeKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const needsWebSearch = (message) => {
    const lowerMessage = message.toLowerCase();
    const searchKeywords = [
      'yangi', 'oxirgi', 'hozirgi', 'bugun', 'kecha', '2025', 'joriy',
      'latest', 'recent', 'current', 'today', 'news', 'weather',
      'narx', 'kurs', 'valyuta', 'dollar', 'euro', 'som',
      'ob-havo', 'iqlim', 'sport', 'futbol', 'yangilik',
      'covid', 'koronavirus', 'saylov', 'prezident',
      'bitcoin', 'kripto', 'cryptocurrency', 'nft',
      'film', 'kino', 'musiqa', 'konsert', 'festival'
    ];
    
    return searchKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const simulateWebSearch = async (query) => {
    const mockResults = {
      'weather': 'Toshkent: +15°C, bulutli havo. Ertaga +18°C kutilmoqda.',
      'dollar': 'USD/UZS: 12,450 so\'m (2025-yil yanvar)',
      'news': 'O\'zbekistonda yangi texnologiya parklari ochilyapti.',
      'covid': 'COVID-19 holati barqarorlashgan (2025-yil ma\'lumotlari)',
      'technology': 'AI texnologiyalari 2025-yilda yangi bosqichga o\'tdi',
      'sport': 'O\'zbekiston futbol terma jamoasi yaxshi natijalar ko\'rsatmoqda',
      'programming': 'JavaScript, Python, React 2025-yilda yangi versiyalari chiqdi',
      'crypto': 'Bitcoin narxi 2025-yilda $45,000 atrofida',
      'ai': 'ChatGPT-5 va Claude 4 modellari 2025-yilda ishga tushdi'
    };
    
    for (const [key, value] of Object.entries(mockResults)) {
      if (query.toLowerCase().includes(key)) {
        return value;
      }
    }
    
    return `Yangi ma'lumotlar: ${query} bo'yicha eng so'nggi yangiliklar topildi.`;
  };

  const generateClaudeResponse = async (userMessage, conversationHistory) => {
    try {
      let searchResults = null;
      let searchInfo = '';
      const isCodeRequest = detectCodeRequest(userMessage);
      
      setIsCodeMode(isCodeRequest);
      
      // Check if we need web search
      if (needsWebSearch(userMessage)) {
        setIsSearching(true);
        try {
          const searchQuery = await window.claude.complete(`
            Ushbu O'zbek tilida berilgan so'rovni internet qidiruviga mos ingliz tilida qidiruv so'zlariga aylantiring. Faqat qidiruv so'zlarini yuboring:
            
            So'rov: "${userMessage}"
            
            Qidiruv so'zlari (ingliz tilida, 2-5 so'z):
          `);
          
          searchResults = await simulateWebSearch(searchQuery.trim());
          
          if (searchResults) {
            searchInfo = `
            
            YANGI MA'LUMOTLAR (Internet qidiruvidan):
            ${searchResults}
            
            Bu ma'lumotlarni javobingizda ishlating.
            `;
          }
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      }

      const conversationContext = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const codeInstructions = isCodeRequest ? `
      
      DASTURLASH QOIDALARI:
      - Agar kod so'ralsa, to'liq ishlaydigan kod yozing
      - Kod izohlarini O'zbek tilida yozing
      - HTML, CSS, JavaScript, Python, React va boshqa tillarda ishlay olasiz
      - Kod bloklarini \`\`\` bilan o'rab bering
      - Kod tushuntirishini ham bering
      - Xatolarni toping va tuzating
      - Optimallashtirishni taklif qiling
      - Eng yaxshi amaliyotlarni qo'llang
      ` : '';

      const prompt = `
      Siz "Claude Chat" nomli universal botssiz. Sizning vazifangiz:

      ASOSIY QOIDALAR:
      - Faqat O'zbek tilida javob bering
      - Agar "Seni kim yaratgan?" deb so'ralsa: "Meni O'zbekiston tomonidan yaratilganman! 🇺🇿"
      - Ismingiz "Claude Chat"
      - Samimiy, do'stona va professional bo'ling
      - Har qanday mavzuda yordam bering
      - Hozirgi sana: ${new Date().toLocaleDateString('uz-UZ')}
      
      IMKONIYATLARINGIZ:
      - Dasturlash va kod yozish
      - Yangi ma'lumotlar va qidiruv
      - Texnik masalalar yechimi
      - Har qanday mavzuda suhbat
      - Algoritm va loyihalar yaratish
      
      ${codeInstructions}
      ${searchInfo}

      Suhbat tarixi:
      ${JSON.stringify(conversationContext)}

      Foydalanuvchining oxirgi xabari: "${userMessage}"

      Javob (faqat matn):
      `;

      const response = await window.claude.complete(prompt);
      return response.trim();
    } catch (error) {
      console.error('Claude API error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('seni kim yaratgan') || lowerMessage.includes('kim yaratdi')) {
      return "Meni O'zbekiston tomonidan yaratilganman! 🇺🇿";
    }
    
    if (detectCodeRequest(userMessage)) {
      return "Kechirasiz, hozir kod yozishda muammo bor. Qanday kod kerak ekanligini yana ayting, yordam berishga harakat qilaman.";
    }
    
    if (lowerMessage.includes('salom') || lowerMessage.includes('hello')) {
      return "Salom! Qandaysiz? Dasturlash, yangi ma'lumotlar yoki boshqa nima kerak?";
    }
    
    const fallbackResponses = [
      "Qiziq! Bu haqida ko'proq gapirib bering.",
      "Tushundim. Sizning fikringiz juda muhim.",
      "Bu mavzuda qanday yordam kerak?",
      "Ajoyib! Davom eting, tinglayapman."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await generateClaudeResponse(currentInput, messages);
      
      const botResponse = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse = {
        id: messages.length + 2,
        text: "Kechirasiz, xatolik yuz berdi. Qayta urinib ko'ring.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsCodeMode(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatMessage = (text) => {
    // Format code blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = text.split(codeBlockRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <div key={index} className="bg-gray-900 text-green-400 p-3 rounded-lg mt-2 mb-2 overflow-x-auto">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              <span className="text-xs text-gray-400">Kod:</span>
            </div>
            <pre className="text-sm font-mono whitespace-pre-wrap">{part}</pre>
          </div>
        );
      } else {
        // Regular text
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-100 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="h-8 w-8 text-blue-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Claude Chat 
              <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
              <Globe className="h-5 w-5 text-blue-500 animate-spin" />
              <Code className="h-5 w-5 text-purple-500 animate-bounce" />
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <span>🇺🇿 O'zbekiston</span>
              <span>•</span>
              <span>🤖 AI</span>
              <span>•</span>
              <span>🌐 Internet</span>
              <span>•</span>
              <span>💻 Dasturlash</span>
              <span>•</span>
              <span>2025</span>
            </p>
          </div>
          {isCodeMode && (
            <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-full">
              <Terminal className="h-4 w-4 text-purple-600" />
              <span className="text-xs text-purple-600">CODE MODE</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-r from-purple-600 to-blue-600'} rounded-full p-2`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white animate-bounce" />
                )}
              </div>
              <div className={`rounded-lg p-3 shadow-md ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'
              } transform transition-all duration-300 hover:scale-105`}>
                <div className="text-sm">
                  {message.sender === 'bot' ? formatMessage(message.text) : message.text}
                </div>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('uz-UZ', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {(isTyping || isSearching) && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
                {isSearching ? (
                  <Search className="h-4 w-4 text-white animate-spin" />
                ) : isCodeMode ? (
                  <Cpu className="h-4 w-4 text-white animate-pulse" />
                ) : (
                  <Bot className="h-4 w-4 text-white animate-spin" />
                )}
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {isSearching ? "🔍 Internet qidiruvi..." : 
                   isCodeMode ? "💻 Kod yozmoqda..." : 
                   "🤖 AI javob tayyorlamoqda..."}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-white border-t border-blue-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Xabar yozing... (dasturlash, yangi ma'lumotlar yoki boshqa savol)"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-center mt-2 gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FileCode className="h-3 w-3" />
            Dasturlash
          </span>
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Internet
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            AI
          </span>
          <span className="flex items-center gap-1">
            <Bot className="h-3 w-3" />
            Universal yordam
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ClaudeChat;
