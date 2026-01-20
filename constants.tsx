
import { Base, Event, EventType, UserLevel, User, Post } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: '小趣同学',
  avatar: 'https://picsum.photos/id/64/200/200',
  reliabilityScore: 850,
  level: UserLevel.EXPERT,
  tags: ['羽毛球', '剧本杀', '摄影'],
  medals: ['活跃分子', '准时达人']
};

export const MOCK_BASES: Base[] = [
  {
    id: 'b1',
    name: '朝阳区夜跑基地',
    description: '每晚8点，奥森见！一起挥洒汗水，拒绝孤单。',
    cover: 'https://picsum.photos/id/10/600/400',
    tags: ['#运动', '#健康', '#朝阳区'],
    ownerId: 'u2',
    memberCount: 1240,
    joinRequirements: ['需实名认证', '坚持每周跑步至少2次'],
    recentNotice: '本周五有荧光夜跑活动，记得穿亮色衣服！'
  },
  {
    id: 'b2',
    name: '周五桌游局',
    description: '狼人杀、阿瓦隆、血染钟楼，寻找北京最强大脑。',
    cover: 'https://picsum.photos/id/20/600/400',
    tags: ['#策略', '#室内', '#北京'],
    ownerId: 'u3',
    memberCount: 520,
    recentNotice: '新人进群请先看置顶攻略。'
  },
  {
    id: 'b3',
    name: '香山徒步摄影组',
    description: '用镜头记录每一座山峰，用脚步丈量自然。',
    cover: 'https://picsum.photos/id/15/600/400',
    tags: ['#户外', '#摄影', '#徒步'],
    ownerId: 'u4',
    memberCount: 315
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: '香山红叶行：深秋摄影组',
    baseId: 'b3',
    baseName: '香山徒步摄影组',
    type: EventType.AA,
    startTime: '2023-11-15 09:00',
    location: '香山公园东门',
    maxParticipants: 12,
    currentParticipants: 8,
    priceEstimate: 50,
    reliabilityThreshold: 600,
    organizer: {
      id: 'u4',
      name: '阿力',
      avatar: 'https://picsum.photos/id/65/100/100',
      reliabilityScore: 920,
      level: UserLevel.ELDER,
      tags: ['徒步', '摄影'],
      medals: ['核心成员']
    },
    description: '周末一起去香山看红叶，主要目的是拍照，体力不支的同学请三思。中午一起AA午餐。',
    cover: 'https://picsum.photos/id/28/600/400',
    status: 'open'
  },
  {
    id: 'e2',
    title: '周二晚8点，羽毛球高水平局',
    baseId: 'b1',
    baseName: '朝阳区夜跑基地',
    type: EventType.AA,
    startTime: '2023-11-12 20:00',
    location: '奥体中心羽毛球馆',
    maxParticipants: 4,
    currentParticipants: 3,
    priceEstimate: 45,
    reliabilityThreshold: 750,
    organizer: CURRENT_USER,
    description: '水平4.0以上进，AA球费，谢绝新手，打得爽最重要。',
    cover: 'https://picsum.photos/id/43/600/400',
    status: 'open'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u5',
      name: '琪琪',
      avatar: 'https://picsum.photos/id/66/100/100',
      reliabilityScore: 780,
      level: UserLevel.NEWBIE,
      tags: [],
      medals: []
    },
    content: '今天跟基地的小伙伴们去骑行了，长安街的夜色太美啦！#北京夜骑 #趣玩生活',
    images: ['https://picsum.photos/id/33/500/500', 'https://picsum.photos/id/34/500/500'],
    likes: 42,
    comments: 8,
    timestamp: '2小时前'
  }
];
