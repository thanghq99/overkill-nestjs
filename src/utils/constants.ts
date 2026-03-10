export const ENVIRONMENT = {
  Development: 'development',
  Staging: 'staging',
  Production: 'production',
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
