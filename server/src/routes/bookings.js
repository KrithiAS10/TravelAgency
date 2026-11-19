import { Router } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import auth from '../middleware/auth.js';
const router = Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.body;
    const start = new Date(checkIn), end = new Date(checkOut), count = Number(guests);
    if (!mongoose.isValidObjectId(hotelId) || !Number.isFinite(start.getTime()) ||
        !Number.isFinite(end.getTime()) || end <= start || !Number.isInteger(count) || count < 1)
      return res.status(400).json({ message: 'Please provide valid hotel, dates and guest count' });
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    const nights = Math.ceil((end - start) / 86400000);
    const booking = await Booking.create({
      user: req.user.id, hotel: hotel.id, checkIn: start, checkOut: end,
      guests: count, totalPrice: nights * hotel.pricePerNight
    });
    res.status(201).json({ message: 'Booking request submitted', booking });
  } catch (e) { next(e); }
});

router.get('/my', auth, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (e) { next(e); }
});
export default router;
