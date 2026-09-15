const Booking = require('../models/Booking');
const { toDate, isValidStayRange, rangesOverlap } = require('../utils/dateUtils');

/**
 * Determines whether a room is available for a given date range.
 *
 * Rule: check-in is inclusive, check-out is exclusive. A room is
 * unavailable only if there is a CONFIRMED booking whose range overlaps
 * the requested range:
 *
 *   existingCheckIn < requestedCheckOut AND existingCheckOut > requestedCheckIn
 *
 * @param {string} roomId
 * @param {string|Date} checkIn
 * @param {string|Date} checkOut
 * @param {string} [excludeBookingId] - pass the booking's own id when
 *   re-checking availability during a modification, so it doesn't
 *   block itself.
 * @returns {Promise<{ available: boolean, conflictingBookings: object[] }>}
 */
async function checkRoomAvailability(roomId, checkIn, checkOut, excludeBookingId) {
  const start = toDate(checkIn);
  const end = toDate(checkOut);

  if (!isValidStayRange(start, end)) {
    const err = new Error('checkOut must be a valid date strictly after checkIn.');
    err.status = 400;
    throw err;
  }

  // Only confirmed bookings can block a room; cancelled ones never do.
  const query = {
    roomId,
    status: 'confirmed',
    checkIn: { $lt: end },
    checkOut: { $gt: start },
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const conflictingBookings = await Booking.find(query).lean();

  // Defensive re-check with the explicit predicate, in case the query
  // above is ever loosened during future edits.
  const trueConflicts = conflictingBookings.filter((b) =>
    rangesOverlap(b.checkIn, b.checkOut, start, end)
  );

  return {
    available: trueConflicts.length === 0,
    conflictingBookings: trueConflicts,
  };
}

module.exports = { checkRoomAvailability };
