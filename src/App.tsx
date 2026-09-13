import { useState, useEffect } from 'react';
import { initialChats } from './data/mockChats';
import { collegeProjectAiSummary } from './data/aiSummaryData';
import { LoginScreen } from './components/LoginScreen';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { AiSummaryView } from './components/AiSummaryView';
import type { Chat, Message } from './types';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('Alex');
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string>('college-project-team');
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState<boolean>(false);
  const [isDrawerMode, setIsDrawerMode] = useState<boolean>(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  // Purge any message matching "hi dg" (case-insensitive)
  useEffect(() => {
    setChats((prev) =>
      prev.map((c) => {
        const filtered = c.messages.filter(
          (m) => m.text.trim().toLowerCase() !== 'hi dg'
        );
        if (filtered.length !== c.messages.length) {
          const last = filtered[filtered.length - 1];
          return {
            ...c,
            lastMessage: last ? last.text : '',
            lastTimestamp: last ? last.timestamp : '',
            messages: filtered,
          };
        }
        return c;
      })
    );
  }, []);

  const selectedChat = chats.find((c) => c.id === selectedChatId) || chats[0];

  const handleLogin = (name: string) => {
    setCurrentUser(name);
    setIsLoggedIn(true);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setMobileView('chat');
    // Clear unread count when user opens chat
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (chatId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `msg_user_${Date.now()}`,
      senderId: 'user',
      senderName: currentUser,
      senderColor: '#128c7e',
      text,
      timestamp: timeStr,
      date: 'Today',
      isUser: true,
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: timeStr,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const handleDeleteMessage = (chatId: string, messageId: string) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          const remaining = c.messages.filter((m) => m.id !== messageId);
          const lastMsg = remaining.length > 0 ? remaining[remaining.length - 1].text : '';
          const lastTime = remaining.length > 0 ? remaining[remaining.length - 1].timestamp : '';
          return {
            ...c,
            lastMessage: lastMsg,
            lastTimestamp: lastTime,
            messages: remaining,
          };
        }
        return c;
      })
    );
  };


  const handleViewSource = (messageId: string) => {
    // If not already in the college project team chat, switch to it
    if (selectedChatId !== 'college-project-team') {
      setSelectedChatId('college-project-team');
    }
    setMobileView('chat');
    setHighlightedMessageId(messageId);
  };

  if (!isLoggedIn) {
    return <LoginScreen onEnter={handleLogin} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#0c1317] select-none">
      {/* Left Chat List Column */}
      <div
        className={`${
          mobileView === 'chat' ? 'hidden lg:block' : 'block'
        } w-full lg:w-[380px] xl:w-[420px] h-full flex-shrink-0`}
      >
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          currentUser={currentUser}
        />
      </div>

      {/* Right Chat Conversation Column */}
      <div
        className={`${
          mobileView === 'list' ? 'hidden lg:flex' : 'flex'
        } flex-1 h-full flex-col min-w-0`}
      >
        <ChatWindow
          chat={selectedChat}
          onOpenAiSummary={() => setIsAiSummaryOpen(true)}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          highlightedMessageId={highlightedMessageId}
          onBackToList={() => setMobileView('list')}
        />

      </div>

      {/* AI Summary Modal / Drawer (Sections 10 - 22) */}
      <AiSummaryView
        summaryData={collegeProjectAiSummary}
        isOpen={isAiSummaryOpen}
        onClose={() => setIsAiSummaryOpen(false)}
        onViewSource={handleViewSource}
        isDrawerMode={isDrawerMode}
        onToggleDrawerMode={() => setIsDrawerMode(!isDrawerMode)}
      />
    </div>
  );
}

export default App;
