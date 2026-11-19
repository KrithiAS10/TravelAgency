import mongoose from 'mongoose';
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true, index: true },
  description: String,
  address: String,
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 4 },
  image: String,
  amenities: [String]
}, { timestamps: true });
export default mongoose.model('Hotel', hotelSchema);
