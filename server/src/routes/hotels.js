import { Router } from 'express';
import Hotel from '../models/Hotel.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.destination
      ? { destination: { $regex: String(req.query.destination), $options: 'i' } } : {};
    const hotels = await Hotel.find(filter).sort({ rating: -1 });
    res.json(hotels);
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (e) { next(e); }
});
export default router;
