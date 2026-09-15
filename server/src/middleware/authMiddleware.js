const jwt = require('jsonwebtoken');

/**
 * Verifies the JWT sent in the Authorization header and attaches the
 * decoded payload (expects { id, role }) to req.user.
 *
 * TODO: hook this up once authController issues real tokens.
 */
function authenticateUser(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = { authenticateUser };
