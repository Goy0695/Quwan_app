
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, MessageSquare, Plus, Bell, Share2 } from 'lucide-react';
import { MOCK_BASES, MOCK_EVENTS } from '../constants';

const BaseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = MOCK_BASES.find(b => b.id === id);

  if (!base) return <div className="p-10 text-center">基地不存在</div>;

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header Image */}
      <div className="relative h-60 w-full">
        <img src={base.cover} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 flex items-end gap-4 z-10">
          <div className="bg-white p-1 rounded-2xl shadow-xl">
            <img src={base.cover} className="w-20 h-20 rounded-xl object-cover" />
          </div>
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-white mb-1">{base.name}</h1>
            <p className="text-white/80 text-xs">{base.memberCount} 成员 · {base.tags.join(' ')}</p>
          </div>
        </div>
      </div>

      {/* Info & Action Section */}
      <div className="bg-white rounded-t-3xl -mt-4 relative z-20 px-6 pt-8 pb-6 shadow-xl">
        <div className="flex gap-3 mb-6">
          <button className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-orange-200">
            申请加入
          </button>
          <button className="bg-gray-100 text-gray-600 p-3 rounded-2xl">
            <MessageSquare size={24} />
          </button>
        </div>

        {base.recentNotice && (
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3 mb-6">
            <Bell size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              <span className="font-bold">最新公告：</span>{base.recentNotice}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            基地介绍 <Info size={14} className="text-gray-400" />
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed italic">{base.description}</p>
        </div>

        {base.joinRequirements && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-2">加入门槛</h3>
            <div className="flex flex-wrap gap-2">
              {base.joinRequirements.map(req => (
                <span key={req} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded">#{req}</span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex justify-between">
            近期组局 
            <span className="text-orange-500 text-[10px] font-normal">发起组局+</span>
          </h3>
          <div className="space-y-3">
             {MOCK_EVENTS.filter(e => e.baseId === base.id).map(event => (
               <div key={event.id} onClick={() => navigate(`/event/${event.id}`)} className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex justify-between items-center active:scale-[0.98] transition-all">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-800">{event.title}</span>
                    <span className="text-[10px] text-gray-400">{event.startTime} | {event.location}</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                     <span className="text-[10px] font-bold text-orange-600">报名中</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseDetail;
