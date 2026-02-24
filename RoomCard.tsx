
import React, { useState } from 'react';
import { Room } from '../types';
import { POUSADA_CONFIG } from '../constants';
import ImageWithFallback from './ImageWithFallback';

interface RoomCardProps {
  room: Room;
  onBookingClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookingClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100" onClick={onBookingClick}>
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback 
          src={room.images[currentImageIndex]}
          fallbackSrc="/fallback.jpg"
          alt={room.name}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100 text-purple-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100 text-purple-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
          {room.images.map((_: string, i: number) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-2.5' : 'bg-white/60'}`} 
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition">{room.name}</h3>
          <div className="flex items-center text-sm font-medium text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className="mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            5.0
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{room.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity: string) => (
            <span key={amenity} className="text-[10px] font-semibold uppercase tracking-wider bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-100">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-baseline space-x-1">
          <span className="text-lg font-bold text-gray-900">{POUSADA_CONFIG.currency} {room.pricePerNight}</span>
          <span className="text-gray-500 text-sm">/ noite</span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
