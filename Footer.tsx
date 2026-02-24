
import React, { useState } from 'react';
import { POUSADA_CONFIG } from '../constants';
import { Home, Share2, Check } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const shareUrl = window.location.href;
  const shareTitle = POUSADA_CONFIG.name;
  const shareText = POUSADA_CONFIG.slogan;
  
  // Generates the embed URL based on the address configured in constants
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(POUSADA_CONFIG.address)}&output=embed`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo and Slogan */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Home className="w-8 h-8 text-purple-700" />
              </div>
            </div>
            <p className="text-purple-800 text-sm italic font-bold leading-relaxed">
              "{POUSADA_CONFIG.slogan}"
            </p>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Sua melhor experiência temática em Guaratuba. Conforto, exclusividade e momentos mágicos inspirados no mundo da magia.
            </p>
            
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-100 transition-all active:scale-95"
              >
                <Share2 className="w-3 h-3" />
                Compartilhar Site
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-purple-100 p-2 z-50 animate-fade-in">
                  <button 
                    onClick={shareWhatsApp}
                    className="w-full flex items-center gap-3 p-3 hover:bg-green-50 rounded-xl transition text-left"
                  >
                    <div className="bg-green-100 p-1.5 rounded-lg">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.136 1.379 4.794 1.38h.005c5.42 0 9.834-4.414 9.836-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.863-4.334-2.888-6.962-2.889-5.422 0-9.837 4.415-9.839 9.835-.001 1.76.465 3.48 1.345 4.984l-1.01 3.693 3.716-.975z" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tighter">WhatsApp</span>
                  </button>
                  
                  <button 
                    onClick={shareFacebook}
                    className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition text-left"
                  >
                    <div className="bg-blue-100 p-1.5 rounded-lg">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tighter">Facebook</span>
                  </button>

                  <button 
                    onClick={copyToClipboard}
                    className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 rounded-xl transition text-left"
                  >
                    <div className="bg-purple-100 p-1.5 rounded-lg">
                      {copied ? <Check className="w-3 h-3 text-purple-600" /> : <Share2 className="w-3 h-3 text-purple-600" />}
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tighter">
                      {copied ? 'Copiado!' : 'Copiar Link'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">Navegação</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-purple-600 transition flex items-center gap-2"><span>🏠</span> Início</a></li>
              <li><a href="#acomodacoes" className="hover:text-purple-600 transition flex items-center gap-2"><span>✨</span> Acomodações</a></li>
              <li><a href="#acomodacoes" className="hover:text-purple-600 transition flex items-center gap-2"><span>📜</span> Regras da Casa</a></li>
              <li><a href={POUSADA_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition flex items-center gap-2"><span>📸</span> Instagram</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">Contato</h4>
            <ul className="space-y-5 text-sm text-gray-500 font-medium">
              <li className="flex items-start group">
                <div className="bg-purple-50 p-2 rounded-lg mr-3 group-hover:bg-purple-100 transition">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <span>{POUSADA_CONFIG.address}</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-green-50 p-2 rounded-lg mr-3 group-hover:bg-green-100 transition">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <span>(41) 99903-0142</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Interactive Map */}
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase text-[10px] tracking-[0.2em]">Localização</h4>
            <div className="relative group rounded-3xl overflow-hidden h-44 shadow-xl border border-gray-100 bg-gray-50">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={mapUrl}
                title="Mapa Chalé Lumos"
                style={{ 
                  filter: 'contrast(1.1) brightness(1.05)',
                  border: 0 
                }}
                className="transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl"></div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(POUSADA_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center group"
              >
                <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                  Ver no Google Maps
                </span>
              </a>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 font-bold text-center uppercase tracking-widest">
              Venha nos visitar em Guaratuba
            </p>
          </div>
        </div>
        
        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} {POUSADA_CONFIG.name}. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-purple-600 transition uppercase">Privacidade</button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-purple-600 transition uppercase">Termos</button>
            <span className="text-purple-200">|</span>
            <span className="text-gray-300">{POUSADA_CONFIG.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
