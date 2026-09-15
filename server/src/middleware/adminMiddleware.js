/**
 * Requires that authenticateUser has already run and populated req.user.
 * Rejects any request from a non-admin user.
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  next();
}

module.exports = { requireAdmin };
