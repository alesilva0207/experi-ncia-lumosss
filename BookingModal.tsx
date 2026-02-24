
import React, { useState, useMemo } from 'react';
import { Room } from '../types';
import { POUSADA_CONFIG } from '../constants';
import ImageWithFallback from './ImageWithFallback';

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ room, isOpen, onClose }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const bookingStats = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return null;
    
    const subtotal = nights * room.pricePerNight;
    const total = subtotal + room.cleaningFee;
    
    return {
      nights,
      subtotal,
      total
    };
  }, [checkIn, checkOut, room.pricePerNight, room.cleaningFee]);

  const handleWhatsAppBooking = () => {
    if (!bookingStats) return;

    const message = `✨ *SOLICITAÇÃO DE RESERVA - LUMOS EXPERIENCE* ✨

🏠 *Chalé:* ${room.name}
📅 *Entrada:* ${formatDate(checkIn)}
📅 *Saída:* ${formatDate(checkOut)}
🌙 *Estadia:* ${bookingStats.nights} noites
👥 *Hóspedes:* ${guests} pessoa(s)

---
💰 *RESUMO DE VALORES*
Diárias: ${POUSADA_CONFIG.currency} ${bookingStats.subtotal.toFixed(2)}
Limpeza: ${POUSADA_CONFIG.currency} ${room.cleaningFee.toFixed(2)}
*TOTAL ESTIMADO:* ${POUSADA_CONFIG.currency} ${bookingStats.total.toFixed(2)}

✅ Ciente da política de cancelamento: "${POUSADA_CONFIG.cancellationPolicy.substring(0, 50)}..."

Gostaria de verificar a disponibilidade para estas datas!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${POUSADA_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Lado Esquerdo - Detalhes e Políticas */}
        <div className="w-full md:w-5/12 bg-gray-50 border-r border-gray-100 flex flex-col overflow-y-auto no-scrollbar">
          <ImageWithFallback src={room.images[0]} alt={room.name} className="w-full h-48 md:h-64" />
          <div className="p-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{room.name}</h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[10px] text-purple-600 mb-2 uppercase tracking-widest">Regras da Casa</h4>
                <ul className="space-y-1.5">
                  {POUSADA_CONFIG.policies.map((policy, idx) => (
                    <li key={idx} className="text-[11px] text-gray-500 flex items-start">
                      <span className="mr-2 text-purple-300">•</span> {policy}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[10px] text-purple-600 mb-2 uppercase tracking-widest">Política de Cancelamento</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed italic">
                  {POUSADA_CONFIG.cancellationPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário ou Confirmação */}
        <div className="w-full md:w-7/12 p-10 flex flex-col bg-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">
              {isConfirming ? 'Confirme sua reserva' : 'Escolha as datas'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-grow flex flex-col">
            {!isConfirming ? (
              <div className="animate-fade-in space-y-6">
                <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-2 border-b border-gray-200">
                    <div className="p-5 border-r border-gray-200 hover:bg-gray-50 transition">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-tighter">Check-in</label>
                      <input 
                        type="date" 
                        min={today}
                        className="w-full text-sm font-bold outline-none bg-transparent cursor-pointer" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div className="p-5 hover:bg-gray-50 transition">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-tighter">Check-out</label>
                      <input 
                        type="date" 
                        min={checkIn || today}
                        className="w-full text-sm font-bold outline-none bg-transparent cursor-pointer" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-5 hover:bg-gray-50 transition">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-tighter">Hóspedes</label>
                    <select 
                      className="w-full text-sm font-bold outline-none bg-transparent cursor-pointer"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    >
                      {[...Array(room.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Hóspede' : 'Hóspedes'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {bookingStats ? (
                  <div className="space-y-4 p-6 bg-purple-50 rounded-3xl border border-purple-100 animate-fade-in shadow-inner">
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span className="font-medium">Subtotal ({bookingStats.nights} noites)</span>
                      <span className="font-bold">{POUSADA_CONFIG.currency} {bookingStats.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm">
                      <span className="font-medium">Taxa de limpeza</span>
                      <span className="font-bold">{POUSADA_CONFIG.currency} {room.cleaningFee.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-purple-200 flex justify-between font-black text-purple-900 text-xl">
                      <span>Total</span>
                      <span>{POUSADA_CONFIG.currency} {bookingStats.total.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 px-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">
                      Informe as datas desejadas para calcular o valor total da sua estadia mágica.
                    </p>
                  </div>
                )}

                <button 
                  disabled={!bookingStats}
                  onClick={() => setIsConfirming(true)}
                  className={`w-full py-5 rounded-[1.25rem] font-black text-lg text-white transition-all shadow-xl ${bookingStats ? 'bg-purple-700 hover:bg-purple-800 active:scale-95 shadow-purple-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Confirmar Disponibilidade
                </button>
              </div>
            ) : (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Datas selecionadas</p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(checkIn)} até {formatDate(checkOut)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hóspedes</p>
                      <p className="text-sm font-bold text-gray-800">{guests} {guests === 1 ? 'Pessoa' : 'Pessoas'}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 font-medium">Total Final Estimado</span>
                      <span className="text-3xl font-black text-purple-900">{POUSADA_CONFIG.currency} {bookingStats?.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <button 
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-[1.25rem] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.82c1.516.903 3.136 1.379 4.794 1.38h.005c5.42 0 9.834-4.414 9.836-9.835.002-2.628-1.023-5.1-2.885-6.963-1.862-1.863-4.334-2.888-6.962-2.889-5.422 0-9.837 4.415-9.839 9.835-.001 1.76.465 3.48 1.345 4.984l-1.01 3.693 3.716-.975z" /></svg>
                    Finalizar no WhatsApp
                  </button>
                  <button 
                    onClick={() => setIsConfirming(false)}
                    className="w-full py-4 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-gray-600 transition"
                  >
                    ← Alterar detalhes da reserva
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-center text-[10px] font-black text-gray-400 mt-8 uppercase tracking-[0.2em]">
            Reserva direta via WhatsApp · Pousada Lumos
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
