# Database Relationships

User (1) --- (N) Booking
Hotel (1) --- (N) Room
Room (1) --- (N) Booking

Booking.userId -> User._id
Booking.roomId -> Room._id
Room.hotelId -> Hotel._id
