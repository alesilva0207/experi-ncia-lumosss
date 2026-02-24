
export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
  cleaningFee: number;
}
