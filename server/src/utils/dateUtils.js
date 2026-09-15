const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Parses a value into a Date, returning null if it isn't a valid date. */
function toDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** True if checkOut is strictly after checkIn. */
function isValidStayRange(checkIn, checkOut) {
  return checkIn instanceof Date && checkOut instanceof Date && checkOut > checkIn;
}

/**
 * Whole nights between two dates, using actual elapsed time rather than
 * a naive calendar-day count, per the project's pricing rule.
 */
function numberOfNights(checkIn, checkOut) {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / MS_PER_DAY);
}

/**
 * Core overlap predicate: check-in is inclusive, check-out is exclusive.
 * Two stays overlap when one starts before the other ends, in both
 * directions.
 */
function rangesOverlap(existingCheckIn, existingCheckOut, requestedCheckIn, requestedCheckOut) {
  return existingCheckIn < requestedCheckOut && existingCheckOut > requestedCheckIn;
}

module.exports = { toDate, isValidStayRange, numberOfNights, rangesOverlap };
