import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import Hotel from './models/Hotel.js';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const hotels = [
  { name: 'Coastal Comfort Mangalore', destination: 'Mangalore', description: 'Comfortable city stay close to Mangaluru attractions.', address: 'Mangaluru, Karnataka, India', pricePerNight: 2600, rating: 4.4, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900', amenities: ['Wi-Fi','Breakfast','Parking'] },
  { name: 'Seaside Retreat', destination: 'Mangalore', description: 'Relaxing stay for a beachside holiday.', address: 'Panambur, Mangaluru, Karnataka, India', pricePerNight: 3200, rating: 4.5, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900', amenities: ['Wi-Fi','Pool','Restaurant'] },
  { name: 'City Centre Suites', destination: 'Mangalore', description: 'Modern rooms with convenient access to the city.', address: 'Hampankatta, Mangaluru, Karnataka, India', pricePerNight: 2400, rating: 4.3, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900', amenities: ['Wi-Fi','AC','Parking'] },
  { name: 'Malpe Beach Resort', destination: 'Udupi', description: 'A peaceful base for exploring Malpe and Udupi.', address: 'Malpe, Udupi, Karnataka, India', pricePerNight: 3500, rating: 4.6, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900', amenities: ['Wi-Fi','Sea view','Restaurant'] },
  { name: 'Temple Town Residency', destination: 'Udupi', description: 'Convenient accommodation near Udupi town.', address: 'Udupi, Karnataka, India', pricePerNight: 2200, rating: 4.2, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900', amenities: ['Wi-Fi','Breakfast','Parking'] },
  { name: 'Kaup Coastal Stay', destination: 'Udupi', description: 'A comfortable stay for a coastal getaway.', address: 'Kaup, Udupi, Karnataka, India', pricePerNight: 2900, rating: 4.4, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900', amenities: ['Wi-Fi','AC','Beach access'] }
];

await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_agency');
await Hotel.deleteMany({});
await Hotel.insertMany(hotels);
console.log('Mangalore and Udupi sample hotels inserted');
await mongoose.disconnect();
