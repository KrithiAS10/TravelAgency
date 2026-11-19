# TravelAgency – Mangalore & Udupi (MERN)

A React + Express + MongoDB travel-agency project focused only on Mangalore (Mangaluru) and Udupi.

## Features

- TravelAgency-style landing page
- Destination selector for Mangalore and Udupi only
- Tourist attractions grouped by beaches, temples/heritage, churches and nature
- Sample hotel listings for both destinations
- Registration and login with JWT
- Booking requests and My Bookings page

## Run

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

Set `MONGO_URI` and a long random `JWT_SECRET` in `.env`. MongoDB must be running or use MongoDB Atlas.

### Frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Open the Vite URL, normally http://localhost:5173.

## Important

Attractions and hotel listings are starter/demo content, not a complete live directory. Hotel bookings are requests stored in MongoDB; no payment or live room inventory is connected.
