import { Router } from 'express';
const router = Router();
const samples = [
  { name: 'Popular viewpoint', address: 'A scenic local viewpoint', rating: 4.5 },
  { name: 'City museum', address: 'Explore local history and culture', rating: 4.3 },
  { name: 'Central beach or park', address: 'A relaxing outdoor attraction', rating: 4.4 }
];
router.get('/nearby', async (req, res) => {
  const destination = String(req.query.destination || '').trim();
  if (!destination) return res.status(400).json({ message: 'Destination is required' });
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return res.json({ source: 'sample', destination, places: samples });
  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
    url.searchParams.set('query', `tourist attractions in ${destination}`);
    url.searchParams.set('key', key);
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.status === 'REQUEST_DENIED')
      return res.status(502).json({ message: 'Google Places request failed. Check API key and billing settings.' });
    res.json({ source: 'Google Places', destination, places: (data.results || []).slice(0, 10).map(p => ({
      name: p.name, address: p.formatted_address, rating: p.rating,
      location: p.geometry?.location, placeId: p.place_id
    })) });
  } catch { res.status(502).json({ message: 'Unable to retrieve nearby places' }); }
});
export default router;
