import type { Chat, Message } from '../types';
import { collegeProjectMessages } from './collegeProjectMessages';

const rahulMessages: Message[] = [
  {
    id: 'rahul_1',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'Hey, are you coming to campus today?',
    timestamp: '09:30 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'rahul_2',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Yes! Heading over in about 20 minutes.',
    timestamp: '09:32 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'rahul_3',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'Great, grab a coffee at the cafeteria if you can.',
    timestamp: '09:35 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'rahul_4',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Sure, I will grab iced lattes for both of us.',
    timestamp: '09:36 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'rahul_5',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'Lifesaver! Did you check the latest PR on the capstone backend?',
    timestamp: '09:40 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'rahul_6',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Yes, left two comments on the token refresh expiration handling.',
    timestamp: '09:42 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'rahul_7',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'Good catch, I resolved them and merged into staging branch.',
    timestamp: '09:48 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'rahul_8',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Awesome. Are you in the 3rd floor lab?',
    timestamp: '10:15 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'rahul_9',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'Yes, sitting by the corner window desk.',
    timestamp: '10:16 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'rahul_10',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'On my way up the stairs right now.',
    timestamp: '10:20 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'rahul_11',
    senderId: 'rahul',
    senderName: 'Rahul',
    senderColor: '#53bdeb',
    text: 'See you in a sec! Bring your laptop.',
    timestamp: '10:42 AM',
    date: 'Today',
    isUser: false
  }
];

const priyaMessages: Message[] = [
  {
    id: 'priya_1',
    senderId: 'priya',
    senderName: 'Priya',
    senderColor: '#e542a3',
    text: 'Hey! Did you review the slide deck layout?',
    timestamp: '08:45 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'priya_2',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Hey Priya! Yes, the typography and color hierarchy look super professional.',
    timestamp: '08:50 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'priya_3',
    senderId: 'priya',
    senderName: 'Priya',
    senderColor: '#e542a3',
    text: 'Thanks! I adjusted the contrast on the architecture diagram so it projects better.',
    timestamp: '08:52 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'priya_4',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Smart move. Dim projectors always wash out light greys.',
    timestamp: '09:00 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'priya_5',
    senderId: 'priya',
    senderName: 'Priya',
    senderColor: '#e542a3',
    text: 'I\'ll send the updated PDF file soon.',
    timestamp: '10:35 AM',
    date: 'Today',
    isUser: false
  }
];

const friendsGroupMessages: Message[] = [
  {
    id: 'friends_1',
    senderId: 'meena',
    senderName: 'Meena',
    senderColor: '#e69138',
    text: 'Anyone free this evening for quick badminton at the sports complex?',
    timestamp: '09:58 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'friends_2',
    senderId: 'karthik',
    senderName: 'Karthik',
    senderColor: '#9b59b6',
    text: 'I am down after 6 PM once lab shuts down!',
    timestamp: '10:02 AM',
    date: 'Today',
    isUser: false
  },
  {
    id: 'friends_3',
    senderId: 'user',
    senderName: 'You',
    senderColor: '#128c7e',
    text: 'Count me in too! Need a break from coding.',
    timestamp: '10:05 AM',
    date: 'Today',
    isUser: true
  },
  {
    id: 'friends_4',
    senderId: 'arun',
    senderName: 'Arun',
    senderColor: '#25d366',
    text: 'Booked Court 2 from 6:30 to 7:30 PM.',
    timestamp: '10:12 AM',
    date: 'Today',
    isUser: false
  }
];

const classUpdatesMessages: Message[] = [
  {
    id: 'class_1',
    senderId: 'cr',
    senderName: 'Class Representative',
    senderColor: '#3b82f6',
    text: 'Professor uploaded the new lecture material and evaluation rubric on Moodle.',
    timestamp: 'Yesterday',
    date: 'Yesterday',
    isUser: false
  },
  {
    id: 'class_2',
    senderId: 'cr',
    senderName: 'Class Representative',
    senderColor: '#3b82f6',
    text: 'Please review Section 4 regarding IEEE paper format requirements.',
    timestamp: 'Yesterday',
    date: 'Yesterday',
    isUser: false
  }
];

export const initialChats: Chat[] = [
  {
    id: 'college-project-team',
    name: 'College Project Team',
    isGroup: true,
    avatar: '👥',
    groupMembers: ['Rahul', 'Priya', 'Arun', 'Meena', 'Karthik', 'You'],
    memberCount: 6,
    unreadCount: 427,
    lastMessage: 'Agreed! Rest well tonight and see you all in Room 204.',
    lastTimestamp: '10:21 PM',
    messages: collegeProjectMessages
  },
  {
    id: 'rahul',
    name: 'Rahul',
    isGroup: false,
    avatar: '👨‍💻',
    unreadCount: 1,
    lastMessage: 'See you in a sec! Bring your laptop.',
    lastTimestamp: '10:42 AM',
    messages: rahulMessages
  },
  {
    id: 'priya',
    name: 'Priya',
    isGroup: false,
    avatar: '👩‍🎨',
    unreadCount: 1,
    lastMessage: "I'll send the file soon.",
    lastTimestamp: '10:35 AM',
    messages: priyaMessages
  },
  {
    id: 'friends-group',
    name: 'Friends Group',
    isGroup: true,
    avatar: '🎉',
    groupMembers: ['Meena', 'Karthik', 'Arun', 'You'],
    memberCount: 4,
    unreadCount: 0,
    lastMessage: 'Arun: Booked Court 2 from 6:30 to 7:30 PM.',
    lastTimestamp: '10:12 AM',
    messages: friendsGroupMessages
  },
  {
    id: 'class-updates',
    name: 'Class Updates',
    isGroup: true,
    avatar: '📢',
    groupMembers: ['Professor Sharma', 'CR', 'Class (64)'],
    memberCount: 64,
    unreadCount: 0,
    lastMessage: 'Professor uploaded the new material.',
    lastTimestamp: 'Yesterday',
    messages: classUpdatesMessages
  }
];
