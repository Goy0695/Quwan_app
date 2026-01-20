
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, MapPin, Clock, Users, ShieldAlert, BadgeAlert, CheckCircle2 } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import { EventType } from '../types';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = MOCK_EVENTS.find(e => e.id === id);

  if (!event) return <div className="p-10 text-center">活动不存在</div>;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Hero section */}
      <div className="relative h-56">
        <img src={event.cover} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex flex-col gap-6 -mt-8 bg-white rounded-t-3xl relative z-20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded font-bold">{event.type}</span>
            <span className="text-gray-400 text-[10px]">@{event.baseName}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{event.title}</h1>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
               <Clock size={14} />
               <span className="text-[10px] font-bold">时间</span>
            </div>
            <p className="text-xs font-bold text-gray-800">{event.startTime}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
               <MapPin size={14} />
               <span className="text-[10px] font-bold">地点</span>
            </div>
            <p className="text-xs font-bold text-gray-800 truncate">{event.location}</p>
          </div>
        </div>

        {/* Participants Status */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                <Users size={18} className="text-gray-400" />
                <span className="text-sm font-bold">已报名 ({event.currentParticipants}/{event.maxParticipants})</span>
             </div>
             <span className="text-orange-500 text-xs font-bold">还缺 {event.maxParticipants - event.currentParticipants} 人</span>
          </div>
          <div className="flex gap-2">
             {[...Array(event.currentParticipants)].map((_, i) => (
               <img key={i} src={`https://picsum.photos/id/${70+i}/50/50`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
             ))}
             {[...Array(event.maxParticipants - event.currentParticipants)].map((_, i) => (
               <div key={i} className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 bg-white">
                 <span className="text-[10px]">+</span>
               </div>
             ))}
          </div>
        </div>

        {/* Rules & Trust */}
        <div className="space-y-4">
           <h3 className="font-bold text-sm text-gray-900 border-l-4 border-orange-500 pl-2">靠谱门槛</h3>
           <div className="flex items-center justify-between bg-orange-50 p-3 rounded-xl">
             <div className="flex items-center gap-2">
               <CheckCircle2 size={16} className="text-orange-500" />
               <span className="text-xs font-medium text-orange-800">靠谱值需高于 {event.reliabilityThreshold}</span>
             </div>
             <span className="text-[10px] text-orange-400">当前您的分值: 850</span>
           </div>
           
           <div className="flex items-start gap-3 bg-red-50 p-3 rounded-xl">
             <BadgeAlert size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
             <div>
               <p className="text-[11px] font-bold text-red-800">防鸽机制：占位金机制</p>
               <p className="text-[10px] text-red-700 leading-relaxed mt-1">报名后需预交￥20占位金，活动前24小时取消不退。按时签到后原路返还。</p>
             </div>
           </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
           <div className="flex items-center gap-3">
             <img src={event.organizer.avatar} className="w-10 h-10 rounded-full" />
             <div>
                <p className="text-[10px] text-gray-400">发起人</p>
                <p className="text-sm font-bold text-gray-900">{event.organizer.name}</p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-[10px] text-gray-400">靠谱值</p>
             <p className="text-sm font-black text-orange-500 italic">{event.organizer.reliabilityScore}</p>
           </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2">活动详情</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{event.description}</p>
        </div>
      </div>

      {/* Safety Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-8 safe-area-bottom flex gap-3 z-50">
        <button className="flex flex-col items-center justify-center p-2 text-gray-400">
           <ShieldAlert size={20} />
           <span className="text-[10px] mt-1">安全中心</span>
        </button>
        <button className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all">
           立即报名 (预估 {event.type === EventType.AA ? `~￥${event.priceEstimate}` : event.type})
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
