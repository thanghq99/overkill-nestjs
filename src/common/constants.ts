export const ENVIRONMENT = {
  Development: 'development',
  Staging: 'staging',
  Production: 'production',
} as const;

export const AUTH_PROVIDER = {
  Credentials: 'credentials',
  Google: 'google',
  Github: 'github',
  Facebook: 'facebook',
  Email: 'email',
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
export type AuthProvider = (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
