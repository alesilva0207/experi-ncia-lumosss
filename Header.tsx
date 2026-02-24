
import React from 'react';
import { POUSADA_CONFIG } from '../constants';
import { Home } from 'lucide-react';

interface HeaderProps {
  title: string;
  onReserveClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onReserveClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-purple-100 p-2 rounded-xl">
            <Home className="w-6 h-6 text-purple-700" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 hidden lg:block">{title}</h1>
        </div>

        <div className="flex items-center space-x-6">
          <a href={POUSADA_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 font-medium text-sm hidden md:flex items-center gap-1 transition">
             Instagram
          </a>
          <button 
            onClick={onReserveClick}
            className="bg-purple-700 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-purple-800 transition shadow-md active:scale-95"
          >
            Reservar Agora
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
