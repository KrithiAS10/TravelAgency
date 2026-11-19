import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, min: 1, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Requested', 'Confirmed', 'Cancelled'], default: 'Requested' }
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
