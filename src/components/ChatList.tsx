import React, { useState } from 'react';
import type { Chat } from '../types';
import { Search, Users, User, CheckCheck, Sparkles, Filter } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onSelectChat: (chatId: string) => void;
  currentUser: string;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'groups'>('all');

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'unread') {
      return chat.unreadCount > 0;
    }
    if (filterType === 'groups') {
      return chat.isGroup;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#111b21] border-r border-[#222e35] select-none">
      {/* Top Profile Header */}
      <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between border-b border-[#222e35]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00a884] to-[#128c7e] flex items-center justify-center font-semibold text-[#111b21] text-sm shadow">
            {currentUser.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{currentUser}</p>
            <p className="text-[11px] text-[#00a884] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a884] inline-block animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#111b21] text-gray-300 border border-[#2a3942] flex items-center gap-1 font-mono">
            WhatsApp
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-2.5 bg-[#111b21] space-y-2 border-b border-[#222e35]">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="w-full bg-[#202c33] text-sm text-gray-200 placeholder-gray-400 rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:bg-[#111b21] focus:ring-1 focus:ring-[#00a884] transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-1 pt-0.5">
          <button
            onClick={() => setFilterType('all')}
            className={`text-xs px-3 py-1 rounded-full font-medium transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#00a884]/20 text-[#00a884] border border-[#00a884]/40'
                : 'bg-[#202c33] text-gray-400 hover:text-gray-200 hover:bg-[#2a3942]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`text-xs px-3 py-1 rounded-full font-medium transition cursor-pointer flex items-center gap-1 ${
              filterType === 'unread'
                ? 'bg-[#00a884]/20 text-[#00a884] border border-[#00a884]/40'
                : 'bg-[#202c33] text-gray-400 hover:text-gray-200 hover:bg-[#2a3942]'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilterType('groups')}
            className={`text-xs px-3 py-1 rounded-full font-medium transition cursor-pointer flex items-center gap-1 ${
              filterType === 'groups'
                ? 'bg-[#00a884]/20 text-[#00a884] border border-[#00a884]/40'
                : 'bg-[#202c33] text-gray-400 hover:text-gray-200 hover:bg-[#2a3942]'
            }`}
          >
            <Users className="w-3 h-3" /> Groups
          </button>
        </div>
      </div>

      {/* Chat List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#222e35]/50">
        {filteredChats.map((chat) => {
          const isSelected = chat.id === selectedChatId;
          const isMainAiGroup = chat.id === 'college-project-team';

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition relative group ${
                isSelected
                  ? 'bg-[#2a3942]'
                  : 'hover:bg-[#202c33]/70 active:bg-[#202c33]'
              }`}
            >
              {/* Left selection bar */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00a884]" />
              )}

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner ${
                    chat.isGroup
                      ? isMainAiGroup
                        ? 'bg-gradient-to-tr from-[#00a884]/30 to-[#25d366]/30 border border-[#00a884]/50'
                        : 'bg-[#202c33] border border-[#2a3942]'
                      : 'bg-[#202c33] border border-[#2a3942]'
                  }`}
                >
                  {chat.avatar}
                </div>

                {/* Group vs Individual badge indicator */}
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] border border-[#111b21] ${
                    chat.isGroup ? 'bg-[#00a884] text-[#111b21]' : 'bg-[#3b82f6] text-white'
                  }`}
                  title={chat.isGroup ? 'Group Chat' : 'Individual Chat'}
                >
                  {chat.isGroup ? (
                    <Users className="w-2.5 h-2.5 stroke-[2.5]" />
                  ) : (
                    <User className="w-2.5 h-2.5 stroke-[2.5]" />
                  )}
                </div>
              </div>

              {/* Chat details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3
                      className={`text-[15px] font-medium truncate ${
                        isSelected ? 'text-white font-semibold' : 'text-gray-100'
                      }`}
                    >
                      {chat.name}
                    </h3>
                    {isMainAiGroup && (
                      <span className="flex-shrink-0 text-[10px] px-1.5 py-0.2 rounded bg-[#00a884]/20 text-[#00a884] font-semibold flex items-center gap-0.5 border border-[#00a884]/30">
                        <Sparkles className="w-2.5 h-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] flex-shrink-0 ${
                      chat.unreadCount > 0 ? 'text-[#00a884] font-semibold' : 'text-gray-400'
                    }`}
                  >
                    {chat.lastTimestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
                    {!chat.isGroup && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] flex-shrink-0" />
                    )}
                    {chat.isGroup && chat.memberCount && (
                      <span className="text-[10px] text-gray-400 font-normal mr-0.5">
                        [{chat.memberCount} members]
                      </span>
                    )}
                    <span className="truncate">{chat.lastMessage}</span>
                  </div>

                  {/* Unread badge */}
                  {chat.unreadCount > 0 && (
                    <span
                      className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center ${
                        isMainAiGroup
                          ? 'bg-[#00a884] text-[#111b21] animate-pulse'
                          : 'bg-[#00a884] text-[#111b21]'
                      }`}
                    >
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredChats.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            <Filter className="w-8 h-8 mx-auto mb-2 text-gray-600" />
            No conversations found.
          </div>
        )}
      </div>

      {/* WhatsApp bottom tip footer */}
      <div className="p-3 bg-[#182229] border-t border-[#222e35] text-[11px] text-gray-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00a884]"></span>
          End-to-end encrypted
        </span>
        <span className="text-gray-400">v2.24</span>
      </div>
    </div>
  );
};
