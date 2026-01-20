
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Users, MapPin, Clock, Search } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import { EventType } from '../types';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('nearby');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = MOCK_EVENTS.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in slide-in-from-right duration-300">
      {/* Header Tabs */}
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex px-4 pt-4 pb-2 justify-between items-center">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('nearby')}
              className={`text-lg font-bold pb-2 transition-all ${activeTab === 'nearby' ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-400'}`}
            >
              推荐组局
            </button>
            <button 
              onClick={() => setActiveTab('my')}
              className={`text-lg font-bold pb-2 transition-all ${activeTab === 'my' ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-400'}`}
            >
              我的行程
            </button>
          </div>
          <button className="bg-gray-100 p-2 rounded-full">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 pt-4">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索感兴趣的组局、地点..." 
            className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
        {['全部', 'AA制', '仅限女生', '周末', '室内'].map(chip => (
          <span key={chip} className="whitespace-nowrap px-4 py-1.5 bg-gray-50 text-gray-500 text-[11px] rounded-full border border-gray-100 font-medium">
            {chip}
          </span>
        ))}
      </div>

      {/* Event List */}
      <div className="p-4 flex flex-col gap-4">
        {filteredEvents.length > 0 ? filteredEvents.map(event => (
          <div 
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight mb-1 text-sm line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
                  <span className="text-orange-500 font-medium">@{event.baseName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Clock size={12} className="text-gray-400" />
                    <span>{event.startTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <MapPin size={12} className="text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-gray-400" />
                  <span className="text-[11px] font-bold text-orange-600">
                    {event.maxParticipants - event.currentParticipants} 缺 {event.currentParticipants}
                  </span>
                </div>
                <div className="text-gray-900 font-bold text-sm">
                  {event.type === EventType.AA ? `~￥${event.priceEstimate}` : event.type}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center flex flex-col items-center">
            <Search size={48} className="text-gray-100 mb-4" />
            <p className="text-gray-400 text-sm">没找到匹配的组局，换个关键词试试？</p>
          </div>
        )}
      </div>

      {/* Sticky Quick Action */}
      <div className="fixed bottom-24 right-4 animate-bounce">
         <button className="bg-orange-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2">
            <Plus size={20} />
            <span className="font-bold text-sm pr-2">发起组局</span>
         </button>
      </div>
    </div>
  );
};

const Plus: React.FC<{size?: number}> = ({size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

export default Events;
