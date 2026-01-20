
import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  Users, 
  User as UserIcon, 
  PlusCircle 
} from 'lucide-react';

import Home from './pages/Home';
import Events from './pages/Events';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import BaseDetail from './pages/BaseDetail';
import EventDetail from './pages/EventDetail';
import CreatePost from './pages/CreatePost';
import AIConsultant from './pages/AIConsultant';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/base/:id" element={<BaseDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/ai-assistant" element={<AIConsultant />} />
          </Routes>
        </main>

        {/* Tab Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-50 safe-area-bottom">
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            <Compass size={24} />
            <span className="text-[10px] font-medium">基地</span>
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            <Calendar size={24} />
            <span className="text-[10px] font-medium">组局</span>
          </NavLink>
          <div className="relative -top-4">
             <NavLink to="/create-post" className="bg-gradient-to-tr from-orange-400 to-red-500 p-3 rounded-full shadow-lg shadow-orange-200 text-white flex items-center justify-center">
               <PlusCircle size={28} />
             </NavLink>
          </div>
          <NavLink to="/discover" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            <Users size={24} />
            <span className="text-[10px] font-medium">广场</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
            <UserIcon size={24} />
            <span className="text-[10px] font-medium">我的</span>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
};

export default App;
