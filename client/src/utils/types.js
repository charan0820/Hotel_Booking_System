// JSDoc typedefs mirroring server/src/models — for editor intellisense only.

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {'customer'|'admin'} role
 */

/**
 * @typedef {Object} Hotel
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {string} location
 * @property {string[]} images
 * @property {string[]} amenities
 */

/**
 * @typedef {Object} Room
 * @property {string} _id
 * @property {string} hotelId
 * @property {string} roomNumber
 * @property {string} roomType
 * @property {string} description
 * @property {number} pricePerNight
 * @property {number} capacity
 * @property {string[]} amenities
 * @property {string[]} images
 * @property {'available'|'maintenance'|'inactive'} status
 */

/**
 * @typedef {Object} Booking
 * @property {string} _id
 * @property {string} userId
 * @property {string} roomId
 * @property {string} checkIn
 * @property {string} checkOut
 * @property {number} guests
 * @property {number} totalPrice
 * @property {'confirmed'|'cancelled'|'completed'} status
 */

export {};
