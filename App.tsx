
import { Room } from './types';

export const POUSADA_CONFIG = {
  name: "Chalé Lumos Experience",
  whatsappNumber: "5541999030142", 
  slogan: "A experiência mais mágica de Guaratuba.",
  instagramUrl: "https://instagram.com/lumos_xcwb",
  currency: "R$",
  address: "Guaratuba, Paraná",
  policies: [
    "Check-in: 14:00 - 22:00",
    "Check-out: Até as 11:00",
    "Proibido fumar nos ambientes internos",
    "Atenção e cuidado extremo com os itens de coleção e decoração local. Qualquer dano ao local ou aos itens será cobrado e descontado automaticamente pela plataforma."
  ],
  cancellationPolicy: "Cancelamento gratuito por 48 horas após a reserva. Para um reembolso total, o cancelamento deve ser feito até 7 dias antes do check-in. Após esse período, o sinal de reserva não será reembolsado."
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: "lumos-master",
    name: "Experiência Lumos - Chalé Temático",
    description: "Um chalé A-frame único com temática inspirada no mundo da magia em Guaratuba. Desfrute de uma experiência imersiva com decoração temática, cozinha completa e um ambiente aconchegante perfeito para casais. O espaço conta com detalhes mágicos em cada canto, desde a icônica cabine telefônica até o loft confortável.",
    pricePerNight: 380,
    maxGuests: 2,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1555734161041673332/original/c4b41140-bf9c-41cc-88e9-fdb3dae8654f.png?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1555734161041673332/original/a52f8029-4ab4-473a-8e8a-a5c2bf40337c.png?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1555734161041673332/original/cf81a11c-a048-42b6-9e58-2d4f9340fe71.png?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1555734161041673332/original/e76e2fb5-69d3-4a42-b0f1-f5ec8fdbe4ae.png?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1555734161041673332/original/35bae48a-0b9f-4958-b620-eeafb1f2e5a3.jpeg?im_w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1505673539012-ee21c6bb7448?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90"
    ],
    amenities: [
      "Decoração Temática Hogwarts",
      "Cozinha Completa",
      "Ar Condicionado",
      "Wi-Fi",
      "Cama Queen",
      "Área externa",
      "Estacionamento",
      "TV"
    ],
    cleaningFee: 120
  }
];
