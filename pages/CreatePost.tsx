
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Image as ImageIcon, Hash, Users, X } from 'lucide-react';
import { MOCK_BASES } from '../constants';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedBase, setSelectedBase] = useState(MOCK_BASES[0].id);
  const [images, setImages] = useState<string[]>([]);

  const handlePost = () => {
    // In a real app, this would hit an API
    alert('发布成功！快去广场看看吧。');
    navigate('/discover');
  };

  const simulateUpload = () => {
    const newImg = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/500/500`;
    setImages([...images, newImg]);
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-300 min-h-screen bg-white flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <span className="font-bold text-gray-900">发布动态</span>
        <button 
          onClick={handlePost}
          disabled={!content.trim()}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${content.trim() ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          发布
        </button>
      </header>

      <div className="p-6 flex-1 overflow-y-auto">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享此刻的有趣瞬间..."
          className="w-full h-40 resize-none text-base text-gray-800 focus:outline-none placeholder:text-gray-300"
        ></textarea>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100">
              <img src={img} className="w-full h-full object-cover" />
              <button 
                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {images.length < 9 && (
            <button 
              onClick={simulateUpload}
              className="aspect-square bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 gap-1 hover:bg-gray-100 transition-colors"
            >
              <ImageIcon size={24} />
              <span className="text-[10px]">添加图片</span>
            </button>
          )}
        </div>

        {/* Meta Selectors */}
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-2 text-gray-700">
              <Users size={18} className="text-gray-400" />
              <span className="text-sm font-medium">关联基地</span>
            </div>
            <select 
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
              className="text-xs text-orange-500 font-bold bg-transparent focus:outline-none text-right"
            >
              {MOCK_BASES.map(base => (
                <option key={base.id} value={base.id}>{base.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-2 text-gray-700">
              <Hash size={18} className="text-gray-400" />
              <span className="text-sm font-medium">添加话题</span>
            </div>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded">#我的周末</span>
              <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded">#趣玩生活</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
