import { env } from '#app/config/env.js';

// Middleware to require admin authorization based on a Bearer token (for admin updates like new resources)
export const requireAdmin = (req, res, next) => {
  const authorization = req.get('authorization');
  const [scheme, adminKey] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || adminKey !== env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return next();
};
