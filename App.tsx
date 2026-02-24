
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import ImageWithFallback from './components/ImageWithFallback';
import { INITIAL_ROOMS, POUSADA_CONFIG } from './constants';
import { Room } from './types';

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('lumos_rooms_v11');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({ isOpen: false, type: 'terms' });
  const [editPhotos, setEditPhotos] = useState<string[]>(rooms[0].images);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const room = rooms[0];

  useEffect(() => {
    localStorage.setItem('lumos_rooms_v11', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    if (isFullGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFullGalleryOpen]);

  const handleSavePhotos = () => {
    const newRooms = [...rooms];
    newRooms[0].images = editPhotos.filter(url => url.trim() !== '');
    setRooms(newRooms);
    setIsAdminOpen(false);
    setActiveImageIndex(0);
    alert("Galeria salva com sucesso!");
  };

  const updatePhotoAt = (index: number, value: string) => {
    const updated = [...editPhotos];
    updated[index] = value;
    setEditPhotos(updated);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 selection:bg-purple-100">
      <Header title={POUSADA_CONFIG.name} onReserveClick={() => setIsModalOpen(true)} />
      
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 animate-fade-in">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">{room.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm font-semibold">
              <span className="flex items-center text-purple-700">★ 5.0</span>
              <span className="text-gray-300">·</span>
              <span className="underline cursor-pointer hover:text-purple-600 transition">{POUSADA_CONFIG.address}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:text-purple-600 hover:bg-purple-50 transition shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>

        {/* Hero Interactive Carousel */}
        <div id="acomodacoes" className="relative group rounded-[2.5rem] overflow-hidden h-[450px] md:h-[650px] mb-12 shadow-2xl bg-black">
          {/* Main Slide Container */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsFullGalleryOpen(true)}
          >
            {room.images.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <ImageWithFallback src={img} className="w-full h-full" alt={`Slide ${idx + 1}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
            <button 
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-800 hover:bg-white transition-all transform hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-800 hover:bg-white transition-all transform hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Indicators & Full Gallery Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <div className="flex gap-2 p-2 bg-black/20 backdrop-blur-md rounded-full">
              {room.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setIsFullGalleryOpen(true); }}
            className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl font-bold text-sm shadow-xl border border-gray-100 hover:bg-white transition-all flex items-center gap-2 active:scale-95 group/btn"
          >
            <svg className="w-4 h-4 text-purple-600 transition-transform group-hover/btn:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            Todas as {room.images.length} fotos
          </button>
          
          {/* Index Badge */}
          <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-white/20">
            {activeImageIndex + 1} / {room.images.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="border-b border-gray-100 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-1">Chalé Inteiro · Experiência Lumos</h2>
              <p className="text-gray-500 font-medium">Capacidade para {room.maxGuests} pessoas · 1 quarto · 1 banheiro</p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-purple-900">Sobre o Chalé</h3>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {room.description}
              </p>
            </div>

            <div className="mb-12 border-b border-gray-100 pb-12">
              <h3 className="text-xl font-bold mb-6">Amenidades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {room.amenities.map(a => (
                  <div key={a} className="flex items-center gap-4 text-gray-700">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className="font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">Política de Cancelamento</h3>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-600 leading-relaxed">
                  {POUSADA_CONFIG.cancellationPolicy}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Saiba mais sobre as regras da casa no momento da reserva
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <span className="text-3xl font-black text-gray-900">R$ {room.pricePerNight}</span>
                  <span className="text-gray-500 font-medium ml-1">/ noite</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-purple-700 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg active:scale-95 hover:bg-purple-800"
              >
                Reservar Agora
              </button>
              
              <p className="text-[10px] text-center uppercase tracking-widest font-black text-gray-400 mt-6 bg-gray-50 py-2 rounded-lg">
                Reserva direta via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenLegal={(type) => setLegalModal({ isOpen: true, type })} />

      {/* Modal Galeria */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col h-screen animate-fade-in">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <button onClick={() => setIsFullGalleryOpen(false)} className="font-bold text-gray-600 flex items-center gap-2 hover:text-purple-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Voltar
            </button>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Galeria Completa</span>
            <div className="w-10"></div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 md:p-12 no-scrollbar">
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              {room.images.map((img, idx) => (
                <div key={idx} className="relative group/photo">
                  <ImageWithFallback src={img} alt={`Foto ${idx + 1}`} className="w-full h-auto rounded-3xl shadow-lg border border-gray-100" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold opacity-0 group-hover/photo:opacity-100 transition-opacity">
                    Foto {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legal Modal */}
      {legalModal.isOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 max-h-[85vh] overflow-y-auto relative animate-fade-in">
            <button 
              onClick={() => setLegalModal({ ...legalModal, isOpen: false })}
              className="absolute top-8 right-8 text-gray-400 hover:text-black transition text-2xl"
            >✕</button>
            
            <h2 className="text-3xl font-black text-purple-900 mb-8">
              {legalModal.type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
            </h2>
            
            <div className="prose prose-purple max-w-none text-gray-600 space-y-6 text-sm leading-relaxed">
              {legalModal.type === 'terms' ? (
                <>
                  <p className="font-bold text-gray-900">1. Aceitação dos Termos</p>
                  <p>Ao reservar o Chalé Lumos Experience, você concorda com todas as regras estabelecidas, incluindo o cuidado com itens de coleção e a responsabilidade por danos.</p>
                  
                  <p className="font-bold text-gray-900">2. Responsabilidade por Danos</p>
                  <p>O hóspede é integralmente responsável por qualquer dano causado à estrutura do chalé ou aos itens de decoração temática. Itens de coleção possuem valor sentimental e de mercado elevado; qualquer avaria será cobrada integralmente através da plataforma de reserva ou meios diretos.</p>
                  
                  <p className="font-bold text-gray-900">3. Uso do Espaço</p>
                  <p>O chalé é destinado exclusivamente para descanso e experiência temática. Festas ou eventos não autorizados são estritamente proibidos.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-gray-900">1. Coleta de Dados</p>
                  <p>Coletamos apenas os dados necessários para processar sua reserva e garantir sua segurança durante a estadia, como nome, documento e contato.</p>
                  
                  <p className="font-bold text-gray-900">2. Uso das Informações</p>
                  <p>Suas informações são utilizadas exclusivamente para a gestão da sua estadia e comunicação direta via WhatsApp sobre sua reserva.</p>
                  
                  <p className="font-bold text-gray-900">3. Segurança</p>
                  <p>Não compartilhamos seus dados com terceiros, exceto quando exigido por lei ou para processamento de pagamentos seguro.</p>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setLegalModal({ ...legalModal, isOpen: false })}
              className="w-full mt-10 bg-purple-700 text-white py-4 rounded-2xl font-bold hover:bg-purple-800 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-purple-900">Configurar Fotos</h2>
              <button onClick={() => setIsAdminOpen(false)} className="text-gray-400 hover:text-black transition">✕</button>
            </div>
            <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest">Insira URLs diretas das imagens:</p>
            <div className="space-y-3 mb-8">
              {editPhotos.map((url, i) => (
                <div key={i} className="relative">
                   <input 
                    type="text" 
                    className="w-full bg-gray-50 border-2 border-gray-100 p-3 pl-12 rounded-xl text-xs outline-none focus:border-purple-500 transition"
                    value={url}
                    onChange={(e) => updatePhotoAt(i, e.target.value)}
                    placeholder="https://..."
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-purple-300">{i+1}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
              <button onClick={handleSavePhotos} className="flex-1 bg-purple-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-purple-800 transition active:scale-95">Salvar Galeria</button>
              <button 
                onClick={() => { localStorage.removeItem('lumos_rooms_v8'); window.location.reload(); }}
                className="px-6 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <BookingModal room={room} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
