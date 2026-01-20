
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Search } from 'lucide-react';
import { MOCK_POSTS } from '../constants';

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = MOCK_POSTS.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-300">
      <header className="p-4 bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">趣玩广场</h1>
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索动态、用户或话题..." 
            className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </header>

      <div className="p-4 space-y-6">
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Author Info */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} className="w-9 h-9 rounded-full object-cover border border-orange-100" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">{post.author.name}</span>
                    <span className="bg-orange-100 text-orange-600 text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">{post.author.level}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-gray-400">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-3 pb-2 text-sm text-gray-800 leading-relaxed">
              {post.content}
            </div>

            {/* Images */}
            {post.images.length > 0 && (
              <div className="grid grid-cols-2 gap-0.5 mt-1">
                {post.images.map((img, idx) => (
                  <img key={idx} src={img} className="w-full h-48 object-cover" />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="p-3 flex items-center justify-between border-t border-gray-50 mt-2">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-orange-500 transition-colors">
                  <MessageCircle size={18} />
                  <span className="text-xs">{post.comments}</span>
                </button>
              </div>
              <button className="text-gray-500">
                <Share2 size={18} />
              </button>
            </div>
          </article>
        )) : (
          <div className="py-20 text-center flex flex-col items-center">
            <p className="text-gray-400 text-sm">广场空空如也，换个词试试？</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
