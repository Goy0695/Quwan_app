
import React from 'react';
import { Settings, Shield, Award, Calendar, Heart, Wallet, ChevronRight } from 'lucide-react';
import { CURRENT_USER } from '../constants';

const Profile: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom duration-300">
      {/* Profile Header */}
      <header className="bg-gradient-to-b from-orange-50 to-white px-6 pt-12 pb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={CURRENT_USER.avatar} className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" />
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1 rounded-full border-2 border-white">
                <Shield size={12} fill="currentColor" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{CURRENT_USER.name}</h2>
              <p className="text-xs text-gray-500">趣玩号: 9283102</p>
              <div className="mt-2 flex gap-1">
                {CURRENT_USER.medals.map(medal => (
                  <span key={medal} className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded font-medium">{medal}</span>
                ))}
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400">
            <Settings size={22} />
          </button>
        </div>

        {/* Reliability Score Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <Award className="text-green-600" size={18} />
              </div>
              <span className="text-sm font-bold text-gray-800">靠谱值</span>
            </div>
            <span className="text-2xl font-black text-orange-500 italic">{CURRENT_USER.reliabilityScore}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full w-[85%] rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-400">击败了 92% 的用户</span>
            <span className="text-[10px] text-orange-500 font-bold underline">提升记录</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 py-2">
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-900">12</span>
            <span className="text-[10px] text-gray-400">已入基地</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-900">8</span>
            <span className="text-[10px] text-gray-400">成功组局</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-900">45</span>
            <span className="text-[10px] text-gray-400">获赞</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-900">232</span>
            <span className="text-[10px] text-gray-400">积分</span>
          </div>
        </div>
      </header>

      {/* Menu List */}
      <section className="px-6 py-4 space-y-4">
        <MenuItem icon={<Calendar className="text-blue-500" />} title="预约行程" />
        <MenuItem icon={<Heart className="text-red-500" />} title="我的收藏" />
        <MenuItem icon={<Wallet className="text-green-500" />} title="钱包/余额" />
        <MenuItem icon={<Shield className="text-purple-500" />} title="安全中心" />
      </section>

      {/* Real Name Certification Banner */}
      <section className="px-6 mt-4">
        <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm">实名认证，玩得更放心</h4>
            <p className="text-[10px] text-gray-400 mt-1">通过认证可解锁：发起组局、高额补贴</p>
          </div>
          <button className="bg-orange-500 px-4 py-1.5 rounded-full text-xs font-bold">去认证</button>
        </div>
      </section>
    </div>
  );
};

const MenuItem: React.FC<{icon: React.ReactNode, title: string}> = ({icon, title}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 active:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-50 rounded-xl">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800">{title}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </div>
);

export default Profile;
