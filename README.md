# Hotel Room Booking System (MERN)

A full-stack hotel room booking and management system built with MongoDB,
Express, React, and Node.js. Its central technical feature is a
**server-side date-overlap availability engine** that prevents double
bookings, regardless of what the frontend shows.

## Status

This is the initial project scaffold (Week 1 / Day 1 of the build plan).
It wires up:

- A React (Vite) client with routing and a placeholder page structure
- An Express server with a MongoDB connection, health check, and the
  folder layout for models/controllers/routes/services/middleware
- Mongoose model skeletons for `User`, `Hotel`, `Room`, `Booking`
- A stubbed `availabilityService.js` — the date-overlap engine goes here
- npm workspaces-style scripts to run both apps together

No business logic (auth, bookings, availability) is implemented yet —
that's next.

## Project Structure

```
hotel-booking-system/
├── client/              React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/     api.js — axios instance
│       ├── context/       AuthContext.jsx
│       ├── hooks/
│       └── utils/
├── server/               Express backend
│   └── src/
│       ├── config/        db.js — MongoDB connection
│       ├── models/        User, Hotel, Room, Booking
│       ├── controllers/
│       ├── routes/
│       ├── middleware/    auth, admin, error handling
│       ├── services/      availabilityService.js (date-overlap engine)
│       └── utils/
├── tests/
├── package.json           root scripts (run client+server together)
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- A MongoDB instance (local `mongod` or a free MongoDB Atlas cluster)

## Setup

1. Clone the repo and install dependencies for both apps:

   ```bash
   npm run install:all
   ```

2. Configure environment variables.

   **server/.env** (copy from `server/.env.example`):

   ```
   MONGO_URI=mongodb://localhost:27017/hotel-booking
   JWT_SECRET=replace-with-a-long-random-string
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

   **client/.env** (copy from `client/.env.example`):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Run both apps together from the project root:

   ```bash
   npm run dev
   ```

   Or run them separately:

   ```bash
   npm run dev:server   # http://localhost:5000
   npm run dev:client   # http://localhost:5173
   ```

4. Confirm the backend is up:

   ```bash
   curl http://localhost:5000/api/health
   ```

   You should get back `{"status":"ok"}` and the server console should log
   a successful MongoDB connection.

## Date Convention (core rule)

Check-in is inclusive, check-out is exclusive. Two bookings overlap when:

```
existingCheckIn < requestedCheckOut
AND
existingCheckOut > requestedCheckIn
```

This logic will live in `server/src/services/availabilityService.js` and
must be enforced on the backend for every booking create/modify request —
never trust the frontend's availability check alone.

## Roadmap

See the project plan for the full 4-week build sequence: authentication,
hotel/room CRUD, the availability engine, booking creation/modification,
admin dashboard, testing (especially the date-overlap test suite), and
deployment prep.

## License

For educational / project use.
