import jwt from 'jsonwebtoken';
import type { AppRole } from '../middleware/permissions';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback_secret') {
  console.error('CRITICAL: JWT_SECRET must be set to a secure random value in production');
  process.exit(1);
}

export interface JwtPayload {
  userId: string;
  email: string;
  userType: AppRole;
}

export const generateToken = (payload: JwtPayload, rememberMe: boolean = false): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = rememberMe ? '7d' : '15m';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
