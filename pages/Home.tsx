
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShieldCheck, Bot } from 'lucide-react';
import { MOCK_BASES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col animate-in fade-in duration-500 relative min-h-full">
      {/* Header */}
      <header className="p-4 bg-white sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <MapPin size={18} className="text-orange-500" />
          <span className="font-bold text-gray-800">北京</span>
        </div>
        <div className="flex-1 px-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="寻找有趣的基地..." 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
        <button className="relative p-1">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Slogan & Banner */}
      <section className="px-4 py-2">
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-5 text-white shadow-md">
          <h1 className="text-2xl font-bold italic mb-1">找对人，才好玩。</h1>
          <p className="text-orange-50 opacity-90 text-sm">已有 12,403 名玩伴在趣玩安家</p>
          <div className="mt-4 flex gap-2">
            <span className="bg-white/20 px-2 py-1 rounded text-[10px]">#剧本杀</span>
            <span className="bg-white/20 px-2 py-1 rounded text-[10px]">#陆地冲浪</span>
            <span className="bg-white/20 px-2 py-1 rounded text-[10px]">#周五见</span>
          </div>
        </div>
      </section>

      {/* Recommended Bases */}
      <section className="px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            热门基地 
            <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-medium">HOT</span>
          </h2>
          <span className="text-xs text-gray-400">全部</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_BASES.map(base => (
            <div 
              key={base.id} 
              onClick={() => navigate(`/base/${base.id}`)}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="relative h-32">
                <img src={base.cover} alt={base.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="bg-white/90 p-1.5 rounded-lg shadow-sm">
                    <ShieldCheck size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{base.name}</h3>
                    <p className="text-white/80 text-[10px]">{base.memberCount} 成员 · 活跃中</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600 line-clamp-1 mb-2 leading-relaxed">{base.description}</p>
                <div className="flex gap-2">
                  {base.tags.map(tag => (
                    <span key={tag} className="text-gray-400 text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Tip */}
      <section className="px-4 py-8 mb-20">
        <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200 flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <ShieldCheck className="text-blue-600" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">趣玩靠谱值系统</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              所有活动参与者均有“靠谱值”记录，无故鸽子将被扣分并全平台公示，让每一次组局都更放心。
            </p>
          </div>
        </div>
      </section>

      {/* AI Assistant Floating Button */}
      <button 
        onClick={() => navigate('/ai-assistant')}
        className="fixed bottom-24 right-4 w-14 h-14 bg-white border border-gray-100 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Bot className="text-orange-500 relative z-10" size={28} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
      </button>
    </div>
  );
};

export default Home;
