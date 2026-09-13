import React, { useState } from 'react';
import { MessageSquare, Sparkles, ShieldCheck, ArrowRight, Users, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onEnter: (userName: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onEnter }) => {
  const [userName, setUserName] = useState('Alex');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onEnter(userName.trim());
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0c1317] flex flex-col items-center justify-center p-4 selection:bg-[#00a884] selection:text-white">
      {/* Background Top Strip like WhatsApp Web */}
      <div className="fixed top-0 left-0 right-0 h-48 bg-[#00a884]/15 border-b border-[#00a884]/20 -z-0" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Logo and title */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#00a884] to-[#25d366] flex items-center justify-center shadow-lg shadow-[#00a884]/30">
            <MessageSquare className="w-7 h-7 text-[#111b21] fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              WhatsApp Web
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00a884]/20 text-[#00a884] font-semibold border border-[#00a884]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Enhanced
              </span>
            </h1>
            <p className="text-xs text-gray-400">Intelligent Group Chat Summarization Demo</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111b21] border border-[#222e35] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="mb-6 pb-6 border-b border-[#222e35]">
            <h2 className="text-lg font-semibold text-white mb-2">Enter Application</h2>
            <p className="text-sm text-gray-400">
              Experience the fast messaging interface featuring a group chat with <strong className="text-gray-200">427 realistic messages</strong> and instant <strong className="text-[#00a884]">AI Summarization</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
                Your Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] transition"
                  required
                />
                <span className="absolute right-3.5 top-3.5 text-xs text-gray-400 bg-[#111b21] px-2 py-0.5 rounded-md border border-[#2a3942]">
                  Logged in as You
                </span>
              </div>
            </div>

            {/* Quick Demo Preview Box */}
            <div className="bg-[#182229] border border-[#222e35] rounded-xl p-4 space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 font-semibold text-[#00a884]">
                <Users className="w-4 h-4" />
                <span>Featured Demonstration Conversation:</span>
              </div>
              <div className="flex items-center justify-between bg-[#111b21] p-2.5 rounded-lg border border-[#222e35]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00a884]/20 border border-[#00a884]/40 flex items-center justify-center text-sm">
                    👥
                  </div>
                  <div>
                    <p className="font-semibold text-white">College Project Team</p>
                    <p className="text-gray-400 text-[11px]">Rahul, Priya, Arun, Meena, Karthik & You</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#00a884]/20 text-[#00a884] font-medium text-[11px]">
                  427 messages
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00a884]" />
                <span>Includes 1:1 individual chats, small groups, and full AI structured extraction.</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a884] hover:bg-[#008f6f] active:scale-[0.99] text-[#111b21] font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#00a884]/20 cursor-pointer text-sm"
            >
              <span>Launch Messaging Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#222e35] flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a884]" /> End-to-end grounded citations
            </span>
            <span>Zero hallucination source verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
