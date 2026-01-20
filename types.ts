
export enum EventType {
  AA = 'AA制',
  FREE = '免费',
  PAID = '主理人收费'
}

export enum UserLevel {
  NEWBIE = '萌新',
  EXPERT = '达人',
  ELDER = '元老'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  reliabilityScore: number;
  level: UserLevel;
  tags: string[];
  medals: string[];
}

export interface Base {
  id: string;
  name: string;
  description: string;
  cover: string;
  tags: string[];
  ownerId: string;
  memberCount: number;
  joinRequirements?: string[];
  recentNotice?: string;
}

export interface Event {
  id: string;
  title: string;
  baseId: string;
  baseName: string;
  type: EventType;
  startTime: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  priceEstimate: number;
  reliabilityThreshold: number;
  organizer: User;
  description: string;
  cover: string;
  status: 'open' | 'locked' | 'completed';
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  timestamp: string;
}
