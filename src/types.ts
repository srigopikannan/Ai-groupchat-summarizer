export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderColor: string;
  text: string;
  timestamp: string;
  date: string;
  isUser: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  reaction?: string;
}

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  avatar: string;
  groupMembers?: string[];
  memberCount?: number;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: Message[];
}

export interface KeyTopic {
  id: string;
  title: string;
  description: string;
  source_message_ids: string[];
}

export interface ImportantDate {
  id: string;
  date: string;
  title: string;
  description: string;
  source_message_ids: string[];
}

export interface VenueInfo {
  id: string;
  name: string;
  description: string;
  previousVenue?: string;
  source_message_ids: string[];
}

export interface ImportantInfo {
  id: string;
  title: string;
  description: string;
  badge?: string;
  source_message_ids: string[];
}

export interface AnsweredQuestion {
  id: string;
  question: string;
  askedBy: string;
  answeredBy: string;
  answerSummary: string;
  source_message_ids: string[];
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  askedBy: string;
  context: string;
  source_message_ids: string[];
}

export interface DecisionItem {
  id: string;
  decision: string;
  context: string;
  decidedBy: string;
  source_message_ids: string[];
}

export interface ActionItem {
  id: string;
  assignee: string;
  task: string;
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed';
  source_message_ids: string[];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue?: string;
  notes?: string;
  source_message_ids: string[];
}

export interface OtherInfoItem {
  id: string;
  title: string;
  details: string;
  source_message_ids: string[];
}

export interface AiSummaryData {
  chatId: string;
  chatName: string;
  messageCount: number;
  overview: string;
  key_topics: KeyTopic[];
  important_dates: ImportantDate[];
  venues: VenueInfo[];
  important_information: ImportantInfo[];
  questions: {
    answered: AnsweredQuestion[];
    unanswered: UnansweredQuestion[];
  };
  decisions: DecisionItem[];
  action_items: ActionItem[];
  upcoming_events: UpcomingEvent[];
  other_information: OtherInfoItem[];
}
