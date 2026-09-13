import React, { useState, useRef, useEffect } from 'react';
import type { Chat, Message } from '../types';
import {
  Sparkles,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  ArrowDown,
  CheckCheck,
  Info,
  ArrowLeft,
  Trash2,
} from 'lucide-react';


interface ChatWindowProps {
  chat: Chat;
  onOpenAiSummary: () => void;
  onSendMessage: (chatId: string, text: string) => void;
  onDeleteMessage?: (chatId: string, messageId: string) => void;
  highlightedMessageId: string | null;
  onBackToList?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  onOpenAiSummary,
  onSendMessage,
  onDeleteMessage,
  highlightedMessageId,
  onBackToList,
}) => {
  const [inputText, setInputText] = useState('');
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const isMainAiGroup = chat.id === 'college-project-team';

  // Scroll to bottom when chat switches (unless a specific highlight is requested)
  useEffect(() => {
    if (!highlightedMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [chat.id]);

  // Handle source highlight scroll
  useEffect(() => {
    if (highlightedMessageId) {
      setActiveHighlightId(highlightedMessageId);
      // Find element and scroll to it
      const targetElement = document.getElementById(`msg-${highlightedMessageId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.remove('highlight-source-msg');
        // Force reflow
        void targetElement.offsetWidth;
        targetElement.classList.add('highlight-source-msg');

        // Remove highlight class after animation finishes
        const timer = setTimeout(() => {
          targetElement.classList.remove('highlight-source-msg');
          setActiveHighlightId(null);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [highlightedMessageId]);

  // Handle scroll detection for bottom button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 250;
    setShowScrollBottom(!isNearBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(chat.id, inputText.trim());
      setInputText('');
      setTimeout(scrollToBottom, 50);
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';
  let currentGroup: Message[] = [];

  chat.messages.forEach((msg) => {
    if (msg.date !== currentDate) {
      if (currentGroup.length > 0) {
        groupedMessages.push({ date: currentDate, messages: currentGroup });
      }
      currentDate = msg.date;
      currentGroup = [msg];
    } else {
      currentGroup.push(msg);
    }
  });
  if (currentGroup.length > 0) {
    groupedMessages.push({ date: currentDate, messages: currentGroup });
  }

  return (
    <div className="flex flex-col h-full bg-[#0b141a] relative overflow-hidden">
      {/* Top Chat Header */}
      <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between border-b border-[#222e35] z-20 flex-shrink-0 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="lg:hidden p-1.5 -ml-1 text-gray-400 hover:text-white rounded-full hover:bg-[#2a3942] transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Chat Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#2a3942] flex items-center justify-center text-lg flex-shrink-0">
            {chat.avatar}
          </div>

          {/* Name & Subtitle */}
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-white truncate flex items-center gap-2">
              {chat.name}
              {isMainAiGroup && (
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-[#00a884]/20 text-[#00a884] border border-[#00a884]/30 hidden sm:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 427 messages
                </span>
              )}
            </h2>
            <p className="text-[11px] text-gray-400 truncate">
              {chat.isGroup
                ? chat.groupMembers
                  ? chat.groupMembers.join(', ')
                  : `${chat.memberCount} members`
                : 'Online'}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* AI Summarize Button (prominently available in header as well) */}
          {isMainAiGroup && (
            <button
              onClick={onOpenAiSummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00a884] to-[#128c7e] text-[#111b21] hover:brightness-110 active:scale-95 font-bold text-xs shadow-lg shadow-[#00a884]/25 transition cursor-pointer"
              title="Open AI Group Chat Summary"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>✨ AI Summary</span>
            </button>
          )}

          <button className="p-2 text-gray-400 hover:text-gray-200 rounded-full hover:bg-[#2a3942] transition cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-200 rounded-full hover:bg-[#2a3942] transition cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prominent AI Banner pinned inside the conversation (Section 9 Requirement) */}
      {isMainAiGroup && (
        <div className="bg-gradient-to-r from-[#182a2b] via-[#102422] to-[#182a2b] border-b border-[#00a884]/30 px-4 py-3 shadow-lg z-10 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00a884]/20 border border-[#00a884]/40 flex items-center justify-center text-[#00a884] flex-shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  ✨ Use AI to Summarize
                  <span className="text-[10px] bg-[#00a884]/30 text-[#00a884] px-2 py-0.5 rounded-full border border-[#00a884]/40 uppercase tracking-wider font-semibold">
                    Instant
                  </span>
                </h3>
                <p className="text-xs text-gray-300">
                  Quickly understand this group chat with 400+ messages, key decisions, venues, and tasks.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenAiSummary}
              className="w-full sm:w-auto bg-[#00a884] hover:bg-[#00c298] active:scale-[0.98] text-[#111b21] font-extrabold px-5 py-2 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-[#00a884]/30 transition cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Summarize Conversation</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Source Highlight Indicator Pill */}
      {activeHighlightId && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-30 bg-[#00a884] text-[#111b21] px-4 py-1.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <span>🎯 Jumped to source message #{activeHighlightId}</span>
          <button
            onClick={() => setActiveHighlightId(null)}
            className="hover:bg-[#111b21]/20 rounded-full p-0.5 transition cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 chat-bg-pattern space-y-4"
      >
        {/* Top Disclaimer */}
        <div className="text-center py-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#182229]/90 border border-[#222e35] text-[11px] text-[#ffd279] shadow-sm">
            <Info className="w-3 h-3" />
            {isMainAiGroup
              ? 'Showing full historical thread (427 messages). Tap "✨ Use AI to Summarize" to analyze.'
              : 'End-to-end encrypted conversation.'}
          </span>
        </div>

        {/* Grouped Messages by Date */}
        {groupedMessages.map((group) => (
          <div key={group.date} className="space-y-2">
            {/* Sticky Date Badge */}
            <div className="flex justify-center my-3 sticky top-2 z-10">
              <span className="px-3 py-1 rounded-lg bg-[#182229] border border-[#222e35] text-[11px] font-medium text-gray-300 shadow-md">
                {group.date}
              </span>
            </div>

            {/* Messages */}
            {group.messages.map((msg) => {
              const isOutgoing = msg.isUser;
              return (
                <div
                  key={msg.id}
                  id={`msg-${msg.id}`}
                  className={`flex flex-col transition-all duration-300 ${
                    isOutgoing ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3.5 py-2 shadow-sm relative group text-[13.5px] leading-relaxed transition ${
                      isOutgoing
                        ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-xs'
                        : 'bg-[#202c33] text-[#d1d7db] rounded-tl-xs'
                    }`}
                  >
                    {/* Delete button on hover for outgoing messages */}
                    {isOutgoing && onDeleteMessage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMessage(chat.id, msg.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#182229] border border-[#2a3942] hover:bg-rose-600 hover:border-rose-400 text-gray-400 hover:text-white flex items-center justify-center shadow-md cursor-pointer z-10"
                        title="Delete message"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}

                    {/* Sender Name for incoming group messages */}

                    {!isOutgoing && chat.isGroup && (
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span
                          className="text-xs font-semibold hover:underline cursor-pointer"
                          style={{ color: msg.senderColor || '#53bdeb' }}
                        >
                          {msg.senderName}
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition">
                          #{msg.id}
                        </span>
                      </div>
                    )}

                    {/* Message Body */}
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                    {/* Timestamp & Status */}
                    <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5 float-right ml-2 text-[10px] text-gray-400 select-none">
                      <span>{msg.timestamp}</span>
                      {isOutgoing && (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-6 z-20 w-10 h-10 rounded-full bg-[#202c33] hover:bg-[#2a3942] border border-[#2a3942] text-gray-300 shadow-xl flex items-center justify-center transition cursor-pointer active:scale-95"
          title="Scroll to latest messages"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Message Input Bar */}
      <form
        onSubmit={handleSend}
        className="px-4 py-2.5 bg-[#202c33] flex items-center gap-3 border-t border-[#222e35] z-20 flex-shrink-0"
      >
        <button
          type="button"
          className="text-gray-400 hover:text-gray-200 p-1.5 rounded-full hover:bg-[#2a3942] transition cursor-pointer"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-200 p-1.5 rounded-full hover:bg-[#2a3942] transition cursor-pointer"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#2a3942] text-sm text-gray-100 placeholder-gray-400 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#00a884] transition"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer ${
            inputText.trim()
              ? 'bg-[#00a884] text-[#111b21] hover:bg-[#00c298] shadow-md shadow-[#00a884]/30'
              : 'bg-[#2a3942] text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
