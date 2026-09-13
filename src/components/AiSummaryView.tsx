import React, { useState, useEffect } from 'react';
import type { AiSummaryData } from '../types';
import {
  Sparkles,
  CheckCircle,
  HelpCircle,
  Calendar,
  MapPin,
  AlertCircle,
  CheckSquare,
  Clock,
  BookOpen,
  FileText,
  ExternalLink,
  X,
  Layers,
  Search,
  Sidebar,
} from 'lucide-react';


interface AiSummaryViewProps {
  summaryData: AiSummaryData;
  isOpen: boolean;
  onClose: () => void;
  onViewSource: (messageId: string) => void;
  isDrawerMode: boolean;
  onToggleDrawerMode: () => void;
}

export const AiSummaryView: React.FC<AiSummaryViewProps> = ({
  summaryData,
  isOpen,
  onClose,
  onViewSource,
  isDrawerMode,
  onToggleDrawerMode,
}) => {
  // Loading progression state
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadingStages = [
    { text: '✨ Analyzing 427 messages from College Project Team...', sub: 'Parsing conversational context & timelines' },
    { text: 'Finding important topics and discussion threads...', sub: 'Grouping architecture, demo, and submission threads' },
    { text: 'Detecting dates, venues, questions and decisions...', sub: 'Grounding facts with source message IDs' },
    { text: 'Preparing your structured summary...', sub: 'Validating action items and presentation requirements' },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadingStep(0);

      const step1 = setTimeout(() => setLoadingStep(1), 400);
      const step2 = setTimeout(() => setLoadingStep(2), 850);
      const step3 = setTimeout(() => setLoadingStep(3), 1300);
      const stepDone = setTimeout(() => setIsLoading(false), 1700);

      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
        clearTimeout(stepDone);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handler to jump to source
  const handleJump = (msgId: string) => {
    onViewSource(msgId);
    // If not in drawer mode on desktop, close modal so the user sees the message
    if (!isDrawerMode && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div
      className={`${
        isDrawerMode
          ? 'fixed top-0 right-0 bottom-0 w-full sm:w-[500px] lg:w-[560px] z-40 border-l border-[#00a884]/30 shadow-2xl bg-[#111b21] flex flex-col'
          : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm'
      }`}
    >
      <div
        className={`${
          isDrawerMode
            ? 'h-full flex flex-col'
            : 'bg-[#111b21] border border-[#222e35] rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200'
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#182a2b] via-[#102422] to-[#111b21] border-b border-[#00a884]/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00a884]/20 border border-[#00a884]/40 flex items-center justify-center text-[#00a884] shadow-sm">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                ✨ AI Group Summary
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00a884]/20 text-[#00a884] font-semibold border border-[#00a884]/40">
                  Live
                </span>
              </h2>
              <p className="text-xs text-gray-300">
                Analyzed <strong className="text-white font-semibold">{summaryData.messageCount} messages</strong> from{' '}
                <span className="text-[#00a884] font-medium">{summaryData.chatName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Drawer / Split Mode on larger screens */}
            <button
              onClick={onToggleDrawerMode}
              className="hidden lg:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#202c33] hover:bg-[#2a3942] text-gray-300 hover:text-white transition border border-[#2a3942] cursor-pointer"
              title={isDrawerMode ? 'Switch to Centered Modal' : 'Dock as Side Drawer (Split View)'}
            >
              <Sidebar className="w-3.5 h-3.5 text-[#00a884]" />
              <span>{isDrawerMode ? 'Expand' : 'Split Pane'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#202c33] hover:bg-[#2a3942] text-gray-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LOADING ANIMATION STATE (Section 10) */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 space-y-6 text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00a884] to-[#25d366] flex items-center justify-center shadow-xl shadow-[#00a884]/30 animate-pulse">
                <Sparkles className="w-8 h-8 text-[#111b21] fill-current animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="absolute -inset-2 rounded-2xl border border-[#00a884]/40 animate-ping opacity-25" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-bold text-white transition-all duration-300">
                {loadingStages[loadingStep].text}
              </h3>
              <p className="text-xs text-gray-400 transition-all duration-300">
                {loadingStages[loadingStep].sub}
              </p>
            </div>

            {/* Multi-step progress dots */}
            <div className="flex items-center gap-2 pt-2">
              {loadingStages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === loadingStep
                      ? 'w-8 bg-[#00a884]'
                      : idx < loadingStep
                      ? 'w-2 bg-[#00a884]/60'
                      : 'w-2 bg-[#222e35]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsLoading(false)}
              className="text-xs text-gray-500 hover:text-gray-300 underline cursor-pointer pt-4"
            >
              Skip loading animation
            </button>
          </div>
        ) : (
          /* SUMMARY CONTENT (Sections 11 - 21) */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search and Category Tabs Bar */}
            <div className="px-4 py-2.5 bg-[#182229] border-b border-[#222e35] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 flex-shrink-0">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                {[
                  { id: 'all', label: 'All Insights' },
                  { id: 'topics', label: '💡 Topics' },
                  { id: 'dates', label: '📅 Dates & Venue' },
                  { id: 'important', label: '🔔 Important' },
                  { id: 'questions', label: '❓ Questions' },
                  { id: 'decisions', label: '✅ Decisions' },
                  { id: 'actions', label: '📋 Action Items' },
                  { id: 'upcoming', label: '⏰ Upcoming' },
                  { id: 'other', label: '📝 Other Info' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#00a884] text-[#111b21] font-bold shadow-sm'
                        : 'bg-[#202c33] text-gray-300 hover:bg-[#2a3942] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* In-summary quick keyword filter */}
              <div className="relative flex items-center min-w-[160px]">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter insights..."
                  className="w-full bg-[#202c33] text-xs text-white placeholder-gray-400 rounded-lg pl-8 pr-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#00a884]"
                />
              </div>
            </div>

            {/* Scrollable Structured Sections Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Top Banner Notice */}
              <div className="bg-[#182229] border border-[#00a884]/30 rounded-xl p-3.5 flex items-center justify-between text-xs text-gray-300 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00a884] flex-shrink-0" />
                  <span>
                    <strong>I analyzed 427 messages from this group.</strong> Every item links directly to its source message.
                  </span>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#00a884]/20 text-[#00a884] font-semibold text-[10px]">
                  100% Grounded
                </span>
              </div>

              {/* 1. WHAT IS THIS CHAT ABOUT? (Section 12) */}
              {(activeTab === 'all' || activeTab === 'overview') && (
                <section className="bg-[#182229] border border-[#222e35] rounded-xl p-4 sm:p-5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#00a884]" />
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <BookOpen className="w-4 h-4 text-[#00a884]" />
                    <span>📌 What is this chat about?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-1">
                    {summaryData.overview}
                  </p>
                </section>
              )}

              {/* 2. KEY CONCEPTS / TOPICS (Section 13) */}
              {(activeTab === 'all' || activeTab === 'topics') && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00a884]" />
                      <span>💡 Key Topics</span>
                    </h3>
                    <span className="text-[11px] text-gray-400">
                      {summaryData.key_topics.length} core themes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {summaryData.key_topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="bg-[#182229] border border-[#222e35] hover:border-[#00a884]/40 rounded-xl p-4 transition flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                            <span>{topic.title}</span>
                          </h4>
                          <p className="text-xs text-gray-300 leading-relaxed mb-3">
                            {topic.description}
                          </p>
                        </div>

                        {/* View Source Buttons */}
                        <div className="pt-2 border-t border-[#222e35] flex items-center justify-between text-[11px]">
                          <span className="text-gray-400">Sources:</span>
                          <div className="flex items-center gap-1.5">
                            {topic.source_message_ids.slice(0, 3).map((id) => (
                              <button
                                key={id}
                                onClick={() => handleJump(id)}
                                className="px-2 py-0.5 rounded bg-[#202c33] hover:bg-[#00a884] text-[#00a884] hover:text-[#111b21] font-mono font-medium transition cursor-pointer flex items-center gap-1"
                                title={`Jump to message ${id}`}
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span>#{id}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. IMPORTANT DATES (Section 14) */}
              {(activeTab === 'all' || activeTab === 'dates') && (
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00a884]" />
                    <span>📅 Important Dates</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {summaryData.important_dates.map((dateItem) => (
                      <div
                        key={dateItem.id}
                        className="bg-[#182229] border border-[#222e35] hover:border-[#00a884]/50 rounded-xl p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="inline-block px-2.5 py-1 rounded-lg bg-[#00a884]/20 text-[#00a884] font-bold text-xs mb-2">
                            {dateItem.date}
                          </div>
                          <h4 className="text-xs font-semibold text-white mb-1">{dateItem.title}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed mb-3">
                            {dateItem.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#222e35] flex items-center justify-end">
                          <button
                            onClick={() => handleJump(dateItem.source_message_ids[0])}
                            className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. VENUE / LOCATION (Section 15) */}
              {(activeTab === 'all' || activeTab === 'dates') && (
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00a884]" />
                    <span>📍 Important Venue</span>
                  </h3>

                  {summaryData.venues.map((venue) => (
                    <div
                      key={venue.id}
                      className="bg-[#182229] border border-[#00a884]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-white">{venue.name}</span>
                          {venue.previousVenue && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Changed from {venue.previousVenue}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300">{venue.description}</p>
                      </div>

                      <button
                        onClick={() => handleJump(venue.source_message_ids[0])}
                        className="bg-[#00a884]/20 hover:bg-[#00a884] text-[#00a884] hover:text-[#111b21] font-bold text-xs px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </section>
              )}

              {/* 5. IMPORTANT INFORMATION (Section 16) */}
              {(activeTab === 'all' || activeTab === 'important') && (
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>🔔 Important Information</span>
                  </h3>

                  <div className="space-y-2">
                    {summaryData.important_information.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#182229] border border-[#222e35] hover:border-gray-600 rounded-xl p-3.5 flex items-start justify-between gap-3 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{item.title}</h4>
                            {item.badge && (
                              <span className="text-[10px] px-2 py-0.2 rounded bg-[#202c33] text-gray-300 border border-[#2a3942]">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>
                        </div>

                        <button
                          onClick={() => handleJump(item.source_message_ids[0])}
                          className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 flex-shrink-0 transition cursor-pointer pt-0.5"
                        >
                          <span>View Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. QUESTIONS: ANSWERED & UNANSWERED (Section 17) */}
              {(activeTab === 'all' || activeTab === 'questions') && (
                <section className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#53bdeb]" />
                    <span>❓ Questions</span>
                  </h3>

                  {/* Answered Questions */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5" /> Answered Questions
                    </h4>
                    {summaryData.questions.answered.map((q) => (
                      <div
                        key={q.id}
                        className="bg-[#182229] border border-emerald-900/40 rounded-xl p-3.5 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-white">
                            "{q.question}"
                          </p>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">
                            Asked by <strong className="text-gray-200">{q.askedBy}</strong>
                          </span>
                        </div>
                        <div className="bg-[#111b21] p-2.5 rounded-lg border border-[#222e35] text-xs text-gray-300 flex items-start justify-between gap-2">
                          <div>
                            <span className="text-emerald-400 font-semibold mr-1.5">
                              Answered by {q.answeredBy}:
                            </span>
                            <span>{q.answerSummary}</span>
                          </div>
                          <button
                            onClick={() => handleJump(q.source_message_ids[0])}
                            className="text-[11px] text-[#00a884] hover:text-white font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer ml-2"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Unanswered Questions (Crucial Requirement!) */}
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5" /> Unanswered Questions
                    </h4>
                    {summaryData.questions.unanswered.map((q) => (
                      <div
                        key={q.id}
                        className="bg-[#1f1d18] border border-amber-500/40 rounded-xl p-3.5 space-y-2 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-amber-200">
                            "{q.question}"
                          </p>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30 flex-shrink-0">
                            Pending Response
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          <span className="text-gray-400">Context:</span> {q.context}
                        </p>
                        <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
                          <span className="text-gray-400 text-[11px]">
                            Asked by <strong className="text-gray-200">{q.askedBy}</strong>
                          </span>
                          <button
                            onClick={() => handleJump(q.source_message_ids[0])}
                            className="text-amber-400 hover:text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 7. DECISIONS MADE (Section 18) */}
              {(activeTab === 'all' || activeTab === 'decisions') && (
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#00a884]" />
                    <span>✅ Decisions Made</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {summaryData.decisions.map((dec) => (
                      <div
                        key={dec.id}
                        className="bg-[#182229] border border-[#222e35] hover:border-[#00a884]/40 rounded-xl p-3.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-bold text-white">{dec.decision}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{dec.context}</p>
                          <p className="text-[11px] text-gray-400">
                            Decided by: <strong className="text-gray-300">{dec.decidedBy}</strong>
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-[#222e35] flex items-center justify-end">
                          <button
                            onClick={() => handleJump(dec.source_message_ids[0])}
                            className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 8. TASKS / ACTION ITEMS (Section 19) */}
              {(activeTab === 'all' || activeTab === 'actions') && (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00a884]" />
                      <span>📋 Action Items</span>
                    </h3>
                    <span className="text-[11px] text-gray-400">Grouped by owner</span>
                  </div>

                  <div className="space-y-2.5">
                    {summaryData.action_items.map((act) => (
                      <div
                        key={act.id}
                        className="bg-[#182229] border border-[#222e35] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00a884]/20 border border-[#00a884]/40 flex items-center justify-center font-bold text-xs text-[#00a884] flex-shrink-0 mt-0.5">
                            {act.assignee.slice(0, 1)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{act.assignee}</span>
                              {act.deadline && (
                                <span className="text-[10px] px-2 py-0.2 rounded bg-[#202c33] text-amber-300 border border-[#2a3942]">
                                  ⏰ Deadline: {act.deadline}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-300 mt-0.5">{act.task}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleJump(act.source_message_ids[0])}
                          className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer self-end sm:self-center"
                        >
                          <span>View Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 9. UPCOMING (Section 20) */}
              {(activeTab === 'all' || activeTab === 'upcoming') && (
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#53bdeb]" />
                    <span>⏰ Upcoming Schedule</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {summaryData.upcoming_events.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-[#182229] border border-[#222e35] rounded-xl p-4 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-[#53bdeb] uppercase tracking-wider">
                            {evt.date} • {evt.time}
                          </span>
                          <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                          {evt.venue && (
                            <p className="text-xs text-[#00a884] flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {evt.venue}
                            </p>
                          )}
                          {evt.notes && <p className="text-xs text-gray-300">{evt.notes}</p>}
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-[#222e35] flex items-center justify-end">
                          <button
                            onClick={() => handleJump(evt.source_message_ids[0])}
                            className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 10. OTHER THINGS TO KNOW (Section 21) */}
              {(activeTab === 'all' || activeTab === 'other') && (
                <section className="space-y-3 pb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>📝 Other Things to Know</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {summaryData.other_information.map((other) => (
                      <div
                        key={other.id}
                        className="bg-[#182229] border border-[#222e35] rounded-xl p-3.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white">{other.title}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{other.details}</p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-[#222e35] flex items-center justify-end">
                          <button
                            onClick={() => handleJump(other.source_message_ids[0])}
                            className="text-xs text-[#00a884] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-[#182229] border-t border-[#222e35] flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00a884]" />
            AI Group Summarizer Engine v2.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#202c33] hover:bg-[#2a3942] text-white font-medium transition cursor-pointer text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
